import { Dispatch, SetStateAction } from "react";

export interface Root {
  timesheets: ITimesheets[]
}

export interface ITimesheets {
  id: string
  payPeriodStart: string
  payPeriodEnd: string
  grossPayroll: number
  notes: any
  checkDate: string
  status: string
  customerId: string
  timesheetEntries: TimesheetEntry[]
}

export interface TimesheetEntry {
  employeeName: string
  grossWages: number
  payRate: number
  payType: string
  hours: number
}

export enum TimesheetStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface ITimesheetsContext {
  groupToEdit: ITimesheets | undefined;
  setGroupToEdit: (newGroup: ITimesheets | undefined) => void;
  openEditGroupDialogState: boolean;
  openEditGroupDialog: () => void;
  closeEditGroupDialog: () => void;
  setTitleGroupDialog: Dispatch<SetStateAction<string>>;
  titleGroupDialog: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  timesheets: ITimesheets[];
  setTimesheets: Dispatch<SetStateAction<ITimesheets[]>>;
}
