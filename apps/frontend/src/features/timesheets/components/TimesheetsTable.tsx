import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from 'mui-datatables';
import {
  Typography,
  CircularProgress,
  Stack,
  Select,
  MenuItem,
} from '@mui/material';
import { MUIDataTableDefaultOptions } from '@/constants/muidatatable.constants';
import { Add, Details } from '@mui/icons-material';
import Button from '@mui/material/Button';
import useDeleteTimesheets from '../hooks/useDeleteTimesheets';
import { ITimesheets, TimesheetStatus } from '../models/Timesheets.type';
import { useTimesheetsContext } from '../context/Timesheets.context';
import useUpdateStatusTimesheets from '../hooks/useUpdateStatusTimesheets';
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import toastsManager from '@/utilities/toasts.manager';
import TimesheetModal from './TimesheetModal';
import { useEffect, useState } from 'react';

interface Props {
  Timesheets: ITimesheets[];
  loading: boolean;
  updateTable: () => void;
}

export default function TimesheetsTable({
  Timesheets,
  loading,
  updateTable,
}: Props) {
  const {
    setGroupToEdit,
    openEditGroupDialog,
    setTitleGroupDialog,
    setIsEdit,
  } = useTimesheetsContext();

  const getRole = useSelector((state: AppStore) => state.authState.user.role);

  const { deleteTimesheet } = useDeleteTimesheets();
  const { updateTimesheets } = useUpdateStatusTimesheets();

  const handleEditGroup = (Timesheets: ITimesheets) => {
    setGroupToEdit(Timesheets);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder: 'Buscar',
  };
  const handleEditClick = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleGroupDialog('Edit Employee');
    handleEditGroup(Timesheets[dataTable.rowIndex]);
    openEditGroupDialog();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalType, setModalType] = useState('');
  const [idToEdit, setIdToEdit] = useState('');
  const [notesToEdit, setNotesToEdit] = useState('');

  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', options: { display: false } },
    {
      name: 'payPeriodStart',
      label: 'payPeriodStart',
      options: {
        customBodyRender: (
          payPeriodStart: any,
          dataTable: { rowData: any[] },
        ) => {
          return (
            <Typography
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'blue',
              }}
              onClick={() => handleEditClick(dataTable)}
            >
              {payPeriodStart}
            </Typography>
          );
        },
      },
    },
    {
      name: 'payPeriodEnd',
      label: 'payPeriodEnd',
      options: {
        customBodyRender: (
          payPeriodEnd: any,
          dataTable: { rowData: any[] },
        ) => {
          return (
            <Typography
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'blue',
              }}
              onClick={() => handleEditClick(dataTable)}
            >
              {payPeriodEnd}
            </Typography>
          );
        },
      },
    },
    {
      name: 'grossPayroll',
      label: 'grossPayroll',
    },
    {
      name: 'notes',
      label: 'notes',
    },
    {
      name: 'checkDate',
      label: 'checkDate',
    },
    {
      name: 'status',
      label: 'status',
      options: {
        customBodyRender: (status: string) => {
          return (
            <Select
              value={status}
              onChange={(e) => {
                if (getRole == 'Customer') {
                  toastsManager.showToast(
                    'warning',
                    "You don't have permission to change the status",
                  );
                } else if (getRole == 'Admin') {
                  updateTimesheets({
                    id: Timesheets[0].id,
                    status: e.target.value as string,
                  }).finally(() => {
                    toastsManager.showToast(
                      'success',
                      'The status has been updated successfully',
                    );
                    updateTable();
                  });
                }
              }}
            >
              <MenuItem value={TimesheetStatus?.APPROVED}>
                {'Approved'}
              </MenuItem>
              <MenuItem value={TimesheetStatus?.PENDING}>{'Pending'}</MenuItem>
              <MenuItem value={TimesheetStatus?.REJECTED}>
                {'Rejected'}
              </MenuItem>
            </Select>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Options',
      options: {
        customBodyRender: (id: string, meta: MUIDataTableMeta<unknown>) => {
          return (
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                variant="outlined"
                startIcon={<Details />}
                onClick={async () => {
                  setModalType('details');
                  setIdToEdit(id);
                  handleOpen();
                }}
              >
                DETAIL
              </Button>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={async () => {
                  setModalType('notes');
                  setIdToEdit(id);
                  handleOpen();
                  setNotesToEdit(meta.rowData[4] as string);
                }}
              >
                ADD NOTE
              </Button>
            </Stack>
          );
        },
        setCellProps: () => ({
          width: '300px',
        }),
      },
    },
  ];

  return (
    <div>
      <TimesheetModal
        open={open}
        handleClose={handleClose}
        modalType={modalType}
        idToEdit={idToEdit}
        notesToEdit={notesToEdit}
        updateTable={updateTable}
      />
      <MUIDataTable
        title={
          loading ? (
            <Typography>
              Cargando...
              <CircularProgress size={20} />
            </Typography>
          ) : (
            'List Timesheets'
          )
        }
        data={Timesheets}
        columns={columns}
        options={options}
      ></MUIDataTable>
    </div>
  );
}
