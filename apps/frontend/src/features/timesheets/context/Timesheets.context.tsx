import { createContext, useState, useContext } from "react";
import { ITimesheets, ITimesheetsContext } from "../models/Timesheets.type";
import { PropsProvider } from "@/models/context.type";

export const TimesheetsContext = createContext<ITimesheetsContext | undefined>(
  undefined
);

export const TimesheetsProvider = ({ children }: PropsProvider) => {
  const [groupToEdit, setGroupToEdit] = useState<ITimesheets | undefined>();
  const [openEditGroupDialogState, setopenEditGroupDialogState] =
    useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleGroupDialog, setTitleGroupDialog] =
    useState<string>("Crear grupo");
  const [timesheets, setTimesheets] = useState<ITimesheets[]>([]);
  const openEditGroupDialog = () => {
    setopenEditGroupDialogState(true);
  };

  const closeEditGroupDialog = () => {
    setopenEditGroupDialogState(false);
  };

  return (
    <TimesheetsContext.Provider
      value={{
        groupToEdit,
        setGroupToEdit,
        openEditGroupDialogState,
        openEditGroupDialog,
        closeEditGroupDialog,
        titleGroupDialog,
        setTitleGroupDialog,
        isEdit,
        setIsEdit,
        timesheets,
        setTimesheets,
      }}
    >
      {children}
    </TimesheetsContext.Provider>
  );
};

export const useTimesheetsContext = (): ITimesheetsContext => {
  const context = useContext(TimesheetsContext);

  if (context === undefined) {
    throw new Error("TimesheetsContext debe usarse dentro de TimesheetsProvider");
  }

  return context;
};
