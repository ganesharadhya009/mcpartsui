import {
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridSortModel,
  } from "@mui/x-data-grid";
  import { DataGridRow, PaginationMode } from "../../../infrastructure/types";
  import { QueryOptionsType } from "../../../global/types/globalTypes";
  import { Dispatch, SetStateAction, useCallback } from "react";
  import { StyledDataGrid } from "../../styles/styles";
  import { Box } from "@mui/material";
  
  interface GridInputProps {
    columns: GridColDef[];
    isSortable?: boolean;
    isfilterable?: boolean;
    isLoading?: boolean;
    rows?: DataGridRow;
    paginationMode: PaginationMode;
    setQueryOptions: Dispatch<SetStateAction<QueryOptionsType>>;
    queryOptions: QueryOptionsType;
    headerColor?:string;
    headerTextColor?: string;
  }
  
  export default function DataGridTable({
    columns,
    isSortable = true,
    isfilterable = true,
    isLoading = false,
    rows,
    paginationMode,
    setQueryOptions,
    queryOptions,
    headerColor = "FFFF",
    headerTextColor = "0000"
  }: GridInputProps) {
    const { filterModel, sortModel, paginationModel } = queryOptions;
    const onFilterChange = useCallback((filterModel: GridFilterModel) => {
      // save the data you need from the filter model
      setQueryOptions({ ...queryOptions, filterModel: filterModel });
    }, []);
  
    const onSortChange = useCallback((sortModel: GridSortModel) => {
      // save the data you need from the filter model
      setQueryOptions({ ...queryOptions, sortModel: sortModel });
    }, []);
  
    const onPaginationChange = useCallback(
      (paginationModel: GridPaginationModel) => {
        // save the data you need from the filter model
        setQueryOptions({ ...queryOptions, paginationModel: paginationModel });
      },
      []
    );
  
    return (
      <Box
        sx={{
          height: "673px",
          padding: "16px",
          width: "100%",
          minWidth: 0,
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #EAECF0",
        }}
      >
        <StyledDataGrid
          headerColor={headerColor}
          headerTextColor={headerTextColor}
          columns={columns}
          rowHeight={90}
          disableColumnSorting={!!isSortable}
          disableColumnFilter={!!isfilterable}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          loading={isLoading}
          disableColumnResize={true}
          filterMode={paginationMode}
          sortingMode={paginationMode}
          paginationMode={paginationMode}
          onFilterModelChange={onFilterChange}
          onSortModelChange={onSortChange}
          onPaginationModelChange={onPaginationChange}
          filterModel={filterModel}
          sortModel={sortModel}
          paginationModel={paginationModel}
        />
      </Box>
    );
  }
  