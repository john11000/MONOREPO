import { createContext, useState, useContext } from "react";
import { IGroupsContext, IGroups } from "../models/Groups.type";
import { PropsProvider } from "@/models/context.type";

export const GroupsContext = createContext<IGroupsContext | undefined>(
  undefined
);

export const GroupsProvider = ({ children }: PropsProvider) => {
  const [groupToEdit, setGroupToEdit] = useState<IGroups | undefined>();
  const [openEditGroupDialogState, setopenEditGroupDialogState] =
    useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleGroupDialog, setTitleGroupDialog] =
    useState<string>("Crear grupo");
  const [groups, setGroups] = useState<IGroups[]>([]);
  const openEditGroupDialog = () => {
    setopenEditGroupDialogState(true);
  };

  const closeEditGroupDialog = () => {
    setopenEditGroupDialogState(false);
  };

  return (
    <GroupsContext.Provider
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
        groups,
        setGroups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroupsContext = (): IGroupsContext => {
  const context = useContext(GroupsContext);

  if (context === undefined) {
    throw new Error("GroupsContext debe usarse dentro de GroupsProvider");
  }

  return context;
};
