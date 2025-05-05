import DataGridTable from "../../common/components/datagrid/DataGridTable";
import filterAll from "../../global/assets/icons/equipment_tab_all.svg";
import tabVentilator from "../../../global/assets/icons/equipment_tab_ventilator.svg";
import tabOxygenCylinder from "../../../global/assets/icons/equipment_tab_oxygen_cy.svg";
import tabDialyser from "../../../global/assets/icons/equipment_tab_dialyser.svg";
import tabPhototheraphy from "../../../global/assets/icons/equipment_tab_phototheraphy.svg";
import tabNST from "../../../global/assets/icons/equipment_tab_nst.svg";
import {
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowId,
  GridSortModel,
} from "@mui/x-data-grid";
// import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Tabs as BaseTabs } from "@mui/base/Tabs";
import { Cancel } from "@mui/icons-material";
// import errorToast from "../../../global/utils/ErrorToast";
import { SearchBar } from "../../common/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../global/constants/routesConstants";


// import { appInsights } from "../../../global/services/AzureInsightService";

// import { ErrorResponseType, SuccessResponseType } from "../../../global/types/globalTypes";
// import successToast from "../../../global/utils/SuccessToast";
import ConfirmationModal from "../../common/components/ConfirmationModal";
import Breadcrumb from "../../common/components/Breadcrumbs";

import { StyledTab, TabPanel, TabsList } from "../../common/styles/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface QueryOptionsType {
  filterModel?: GridFilterModel;
  sortModel?: GridSortModel;
  paginationModel?: GridPaginationModel;
}

export interface RowType {
  id: number;
  vehicleNumber: string;
  driverName: string;
  driverNumber: string;
  driverDetails: string;
  ownership: string;
  facilities: string;
}

const CustomerList = () => {
  const [queryOptions, setQueryOptions] = useState<QueryOptionsType>({});
  const [activeTab, setActiveTab] = useState("all");
  const [rows, setRows] = useState<RowType[]>();
  const [filteredRows, setFilteredRows] = useState<RowType[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [rowId, setRowId] = useState<GridRowId>();

  const navigate = useNavigate();

  
  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      width: 183,
      headerName: "Action",
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          showInMenu
          closeMenuOnClick={false}
          onClick={() => {
            navigate(routeNames.addAmbulancePage, { state: params.row });
          }}
        />,
        <GridActionsCellItem
          label="Delete"
          showInMenu
          closeMenuOnClick={true}
          onClick={() => {
            setRowId(params.id);
            setIsOpen(true);
          }}
        />,
      ],
    },
    {
      field: "customerContactName",
      renderCell({ row }) {
        return (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Typography color="#344054">{row.vehiclenumber}</Typography>
          </Box>
        );
      },
      width: 270,
      headerName: "Contact Name",
    },
    {
      field: "contactNumber",
      renderCell({ row }) {
        return (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Typography color="#344054">{row.ownership}</Typography>
          </Box>
        );
      },
      width: 270,
      headerName: "Contact Number",
    },
    {
      field: "company",
      width: 270,
      renderCell({ row }) {
        return (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            gap={"4px"}
          >
            <Box display={"flex"}>
              <Typography color="#667085">
                {/* {infrastructureConstants.NAME}:{" "} */}
              </Typography>
              <Typography color={"#344054"} marginLeft={"4.5px"}>
                {row.drivername}
              </Typography>
            </Box>
            <Box display={"flex"}>
              <Typography color="#667085">
                {/* {infrastructureConstants.MOBILE_NUMBER}:{" "} */}
              </Typography>
              <Typography color={"#344054"} marginLeft={"4.5px"}>
                {row.driverphone}
              </Typography>
            </Box>
          </Box>
        );
      },
      headerName: "Company Name",
    },
    {
      field: "address",
      renderCell({ row }) {
        return (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Typography color="#344054">{row.facilities}</Typography>
          </Box>
        );
      },
      width: 270,
      headerName: "Address",
    }
  ];

  const applyFilter = (query: string) => {
    let filteredData = [...(filteredRows || [])];
    filteredData = filteredData?.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(query.toLowerCase())
      )
    );
    setRows([...filteredData]);
  };

  const handleSearch = (query: string) => {
    applyFilter(query);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  // if (!isLoading && (data || [])?.length < 1) {
  //   return <AmbulanceNoDataFound />;
  // }

  const row = [
    { id: 1, type: "Active", count: 10 },
    { id: 2, type: "Inactive", count: 12 },
   
  ];
  return (
    <Box gap={"16px"} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Breadcrumb />
      <BaseTabs defaultValue={0}>
        
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Customers
          </AccordionSummary>
          <AccordionDetails>
            <Tabs value={activeTab}>
              <Tab
                sx={{
                  padding: "0px 20px 0px 20px",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "start",
                  alignContent: "center",
                  flexDirection: "row",
                  height: "196px",
                  borderRight: "1px solid #EAECF0",
                  minWidth: "150px",
                }}
                value={"All"}
                icon={<img src={filterAll} alt="" />}
                iconPosition="start"
                label={
                  <Box
                    marginLeft={"8px"}
                    display={"flex"}
                    textAlign={"start"}
                    flexDirection={"column"}
                    gap={"12px"}
                  >
                    <Typography
                      variant="h2"
                      fontSize={"20px"}
                      lineHeight={"28px"}
                    >
                      {row?.length}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontSize={"14px"}
                      lineHeight={"21px"}
                    >
                      All
                    </Typography>
                  </Box>
                }
              />
              {row?.map((item) => {
                return (
                  <Tab
                    sx={{
                      padding: "0px 20px 0px 20px",
                      width: "0.20",
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "start",
                      alignContent: "center",
                      flexDirection: "row",
                      height: "196px",
                      borderRight: "1px solid #EAECF0",
                      minWidth: "150px",
                      fontWeight: 200,
                    }}
                    icon={<img src={filterAll} alt="" />}
                    iconPosition="start"
                    value={item.type}
                    label={
                      <Box
                        marginLeft={"8px"}
                        display={"flex"}
                        textAlign={"start"}
                        flexDirection={"column"}
                        gap={"12px"}
                      >
                        <Typography
                          variant="h2"
                          fontSize={"20px"}
                          lineHeight={"28px"}
                        >
                          {item?.count}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontSize={"14px"}
                          lineHeight={"21px"}
                        >
                          {item.type}
                        </Typography>
                      </Box>
                    }
                  />
                );
              })}
            </Tabs>
          </AccordionDetails>
        </Accordion>
      </BaseTabs>
      <Box display={"flex"} justifyContent={"space-between"}>
        <SearchBar onSearch={handleSearch} />
        <Button
          variant="contained-green"
          sx={{ width: "158px" }}
          onClick={() => navigate(routeNames.addCustomer)}
        >
          <Typography variant="body2">Add Customer</Typography>
        </Button>
      </Box>

      <Box marginTop="31px" height={"60.5%"}>
        <DataGridTable
          headerColor="#536279"
          headerTextColor="#FFFFFF"
          paginationMode={"client"}
          setQueryOptions={setQueryOptions}
          queryOptions={queryOptions}
          rows={rows}
          columns={columns}
          isSortable={false}
          isfilterable={false}
          // isLoading={isLoading || isFetching}
        />
      </Box>
      <ConfirmationModal
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        sx={{ width: "500px", height: "300px" }}
        // title={globalConstant.DELETE_CONFIRM_TITLE}
        // desc={globalConstant.DELETE_CONFIRM_DESC}
        icon={Cancel}
        onConfirm={() => {
          const queryParams = { id: rowId || "" };
          // mutate(queryParams);
          setIsOpen(false);
        }}
      />
    </Box>
  );
};

export default CustomerList;
