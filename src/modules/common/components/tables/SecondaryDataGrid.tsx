import { DataGrid, } from "@mui/x-data-grid";
import { secondaryDatagridStyles } from "../../styles/styles";
import { SecondaryDataGridPropType } from "../../types/commonTypes";

const SecondaryDataGrid = ({ rows, columns }: SecondaryDataGridPropType) => {
  return (
    <DataGrid
      columnHeaderHeight={44}
      sx={secondaryDatagridStyles}
      rowHeight={56}
      columns={columns}
      rows={rows}
      hideFooterPagination
      hideFooter
      disableColumnFilter
      disableColumnSorting
      disableColumnMenu
      disableColumnResize
      disableColumnSelector
      disableRowSelectionOnClick
      disableMultipleRowSelection
    />
  );
};

export default SecondaryDataGrid;
