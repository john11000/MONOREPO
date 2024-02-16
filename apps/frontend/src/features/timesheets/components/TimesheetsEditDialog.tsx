import { toastsManager } from "@/utilities";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTimesheetsContext } from "../context/Timesheets.context";
import { TimesheetsFormEdit } from "./TimesheetsFormEdit";
import { ITimesheets } from "../models/Timesheets.type";
import useUpdateTimesheets from "../hooks/useUpdateTimesheets";
import useCreateTimesheets from "../hooks/useCreateTimesheets";

interface Props {
  getTimesheetsFromApi: () => void;
}

export default function TimesheetsEditDialog({ getTimesheetsFromApi }: Props) {
  const { groupToEdit } = useTimesheetsContext();
  const { updateTimesheets, loading } = useUpdateTimesheets();
  const {
    openEditGroupDialogState,
    closeEditGroupDialog,
    titleGroupDialog,
    isEdit,
  } = useTimesheetsContext();
  const { createTimesheets, loading: loadingCreate } = useCreateTimesheets();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITimesheets>();

  const handleOnSave = async (data: ITimesheets) => {
    try {
      debugger

      let res,
        text = "Actualizado";
      if (isEdit) {
        res = await updateTimesheets({
          id: groupToEdit?.id || 0,
          payRate: Number(data.payRate),
          name: data.name,
          payType: data.payType,
        });
      } else {
        text = "Creado";
        res = await createTimesheets({
          name: data?.name || "",
          payRate: Number(data.payRate),
          payType: data.payType,
        });
      }
      if (res.status === 200 || res.status === 201) {
        closeEditGroupDialog();
        toastsManager.showToast("success", "Grupo " + text + " Correctamente");
        await getTimesheetsFromApi();
      } else {
        toastsManager.showToast("error", "Respuesta no esperada");
      }
    } catch (error: any) {
      toastsManager.showToast("error", error);
      console.error(error);
    }
  };

  useEffect(() => {
    if (openEditGroupDialogState) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openEditGroupDialogState]);

  return (
    <Dialog
      open={openEditGroupDialogState}
      onClose={closeEditGroupDialog}
      fullWidth
      maxWidth="md"
    >
      <form noValidate onSubmit={handleSubmit(handleOnSave)}>
        <DialogTitle>{titleGroupDialog}</DialogTitle>
        <DialogContent>
          <TimesheetsFormEdit register={register} errors={errors}></TimesheetsFormEdit>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="contained"
            loading={loading || loadingCreate}
            type="submit"
          >
            Guardar
          </LoadingButton>
          <Button
            variant="contained"
            color="inherit"
            onClick={closeEditGroupDialog}
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
