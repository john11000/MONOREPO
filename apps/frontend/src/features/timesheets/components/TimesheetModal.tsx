import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import toastsManager from '@/utilities/toasts.manager';
import useUpdateNoteTimesheets from '../hooks/useUpdateNoteTimesheet';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  modalType: string;
  idToEdit: string;
  notesToEdit: string;
  updateTable: () => void;
}

export default function TimesheetModal({
  open,
  handleClose,
  modalType,
  idToEdit,
  notesToEdit,
  updateTable,
}: ModalProps) {
  const [notes, setNotes] = useState('');
  const updateTimesheets = useUpdateNoteTimesheets();

  useEffect(() => {
    setNotes(notesToEdit);
  }, [notesToEdit]);

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {modalType === 'notes' ? (
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Notes
              </Typography>
              <Box>
                <textarea
                  value={notes || notesToEdit}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', height: '100px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    updateTimesheets
                      .updateTimesheets({
                        id: idToEdit,
                        note: notes,
                      })
                      .finally(() => {
                        toastsManager.showToast('success', 'Note added');
                        setNotes('');
                        handleClose();
                        updateTable();
                      });
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
