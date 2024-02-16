import MUIDataTable, {
  MUIDataTableColumnDef,
  MUIDataTableMeta,
  MUIDataTableOptions,
} from "mui-datatables";
import { Typography, CircularProgress } from "@mui/material";
import { useGroupsContext } from "../context/Groups.context";
import { IEmployees } from "../models/Groups.type";
import { MUIDataTableDefaultOptions } from "@/constants/muidatatable.constants";
import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import useDeleteEmployees from "../hooks/useDeleteEmployees";

interface Props {
  employees: IEmployees[];
  loading: boolean;
  updateTable: () => void;
}

export default function EmployeesTable({ employees, loading, updateTable }: Props) {
  const {
    setGroupToEdit,
    openEditGroupDialog,
    setTitleGroupDialog,
    setIsEdit,
  } = useGroupsContext();

  const { deleteEmployee } = useDeleteEmployees();
  const handleEditGroup = (employees: IEmployees) => {
    setGroupToEdit(employees);
  };
  const options: MUIDataTableOptions = {
    ...MUIDataTableDefaultOptions,
    searchPlaceholder:
      "Buscar",
  };
  const handleEditClick = (dataTable: MUIDataTableMeta<unknown>) => {
    setIsEdit(true);
    setTitleGroupDialog("Edit Employee");
    handleEditGroup(employees[dataTable.rowIndex]);
    openEditGroupDialog();
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: "id", options: { display: false } },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (_: any, dataTable: { rowData: any[]; }) => {
          return (
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "blue",
              }}
              onClick={() => handleEditClick(dataTable)}
            >{`${dataTable.rowData[1]}`}</Typography>
          );
        },
      },
    },
    {
      name: "payType",
      label: "Pay Type",
    },
    {
      name: "payRate",
      label: "Pay Rate",
    },
    {
      name: "id",
      label: "Options",
      options: {
        customBodyRender: (id: string) => {
          return <Button variant="outlined" startIcon={<Delete />} onClick={async () => {
            await deleteEmployee(id);
            updateTable();
          }}>Delete</Button>
        }
      }
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
          "List employees"
        )
      }
      data={employees}
      columns={columns}
      options={options}
    ></MUIDataTable>
  );
}
