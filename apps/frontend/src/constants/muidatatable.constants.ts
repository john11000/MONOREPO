import { MUIDataTableTextLabels } from "@/utilities";
import { MUIDataTableOptions } from "mui-datatables";

export const MUIDataTableDefaultOptions: MUIDataTableOptions = {
  download: true,
  search: true,
  sort: false,
  print: false,
  viewColumns: false,
  filter: false,
  selectableRows: "none",
  responsive: "standard",
  rowsPerPage: 20,
  rowsPerPageOptions: [20],
  textLabels: MUIDataTableTextLabels,
};
