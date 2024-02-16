import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useTimesheetsContext } from "../context/Timesheets.context";

type Props = {
  // onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function TimesheetsSettings({}: Props) {
  const {
    openEditGroupDialog,
    setTitleGroupDialog,
    setIsEdit,
    setGroupToEdit,
  } = useTimesheetsContext();

  const handleAddGroup = () => {
    setGroupToEdit(undefined);
    setIsEdit(false);
    setTitleGroupDialog("Crear grupo");
    openEditGroupDialog();
  };
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ my: 1 }}>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => handleAddGroup()}
        startIcon={<Add />}
      >
        Añadir
      </Button>
    </Box>
  );
}
