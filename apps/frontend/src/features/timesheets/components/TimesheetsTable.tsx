import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress, Stack, Select, MenuItem } from "@mui/material";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import { Add, Details } from "@mui/icons-material";
import Button from "@mui/material/Button";
import useDeleteTimesheets from "../hooks/useDeleteTimesheets";
import { ITimesheets, TimesheetStatus } from "../models/Timesheets.type";
import { useTimesheetsContext } from "../context/Timesheets.context";

interface Props {
  Timesheets: ITimesheets[];
  loading: boolean;
  updateTable: () => void;
}

export default function TimesheetsTable({ Timesheets, loading, updateTable }: Props) {
  const {
    setGroupToEdit,
    openEditGroupDialog,
    setTitleGroupDialog,
    setIsEdit,
  } = useTimesheetsContext();

  const { deleteTimesheet } = useDeleteTimesheets();
  const handleEditGroup = (Timesheets: ITimesheets) => {
    setGroupToEdit(Timesheets);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder:
      "Buscar",
  };
  const handleEditClick = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleGroupDialog("Edit Employee");
    handleEditGroup(Timesheets[dataTable.rowIndex]);
    openEditGroupDialog();
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "payPeriodStart",
      label: "payPeriodStart",
      options: {
        customBodyRender: (payPeriodStart: any, dataTable: { rowData: any[]; }) => {
          return (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              onClick={() => handleEditClick(dataTable)}
            >{payPeriodStart}</Typography>
          );
        },
      },
    },
    {
      name: "payPeriodEnd",
      label: "payPeriodEnd",
      options: {
        customBodyRender: (payPeriodEnd: any, dataTable: { rowData: any[]; }) => {
          return (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              onClick={() => handleEditClick(dataTable)}
            >{payPeriodEnd}</Typography>
          );
        },
      },
    },
    {
      name: "grossPayroll",
      label: "grossPayroll",
    },
    {
      name: "notes",
      label: "notes",
    },
    {
      name: "checkDate",
      label: "checkDate",
    },
    {
      name: "status",
      label: "status",
      options: {
        customBodyRender: (status: string) => {
          return(
          <Select
            value={status}
            onChange={()=> {}}
          >
            <MenuItem value={TimesheetStatus?.APPROVED}>{TimesheetStatus?.APPROVED}</MenuItem>
            <MenuItem value={TimesheetStatus?.PENDING}>{TimesheetStatus?.PENDING}</MenuItem>
            <MenuItem value={TimesheetStatus?.REJECTED}>{TimesheetStatus?.REJECTED}</MenuItem>
          </Select> 
          )
        }
      }
    },
    {
      name: "id",
      label: "Options",
      options: {
        customBodyRender: (id: string) => {
          return(
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
              <Button variant="outlined" startIcon={<Details />} onClick={async () => {
              }}>DETAIL</Button>
              <Button variant="outlined" startIcon={<Add />} onClick={async () => {
              }}>ADD NOTE</Button>
           </Stack>
          )
        },
        setCellProps: () => ({
          width: '300px',
        })

      },
    },
  ];

  return (
    <MUIDataTable
      title={
        loading ? (
          <Typography>
            Cargando...
            <CircularProgress size={20} />
          </Typography>
        ) : (
          "List Timesheets"
        )
      }
      data={Timesheets}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
