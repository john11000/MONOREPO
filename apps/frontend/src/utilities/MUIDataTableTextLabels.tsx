import { MUIDataTableColumn } from "mui-datatables";
const MUIDataTableTextLabels = {
  body: {
    noMatch: "No hay registros",
    toolTip: "Ordenar",
    columnHeaderTooltip: (column: MUIDataTableColumn) =>
      `Ordenar por ${column.label}`,
  },
  pagination: {
    next: "Página siguiente",
    previous: "Página anterior",
    rowsPerPage: "filas por página:",
    displayRows: "de",
  },
  toolbar: {
    search: "Buscar",
    downloadCsv: "Descargar CSV",
  },
  selectedRows: {
    text: "Fila(s) seleccionadas",
    delete: "Eliminar",
    deleteAria: "Eliminar filas seleccionadas",
  },
};

export default MUIDataTableTextLabels;
