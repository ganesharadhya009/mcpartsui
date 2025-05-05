import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SectionHeader from "../../../common/components/SectionHeader";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  getEquipmentConditionsService,
  getEquipmentTypesService,
} from "../../services/equipmentServices";
import { FieldError, useForm } from "react-hook-form";
import SelectInput from "../../../common/components/form/SelectInput";
import RadioButtonGroup from "../../../common/components/form/RadioButtonGroup";
import { InputForm } from "../../../common/components/form/InputForm";
import { GridColDef } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import SecondaryDataGrid from "../../../common/components/tables/SecondaryDataGrid";

const manageEquipmentCheckBox = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];
const manageTypeCheckBox = [
  { label: "Single", value: "single" },
  { label: "Multiple", value: "multiple" },
];

interface EquipmentRow {
  id: number;
  equipmentNumber: string;
  condition: string;
  subType: string;
}

const AddEquipment = () => {
  const [{ data: equipmentTypes }, { data: equipmentConditions }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: ["getEquipmentTypes"],
          queryFn: () => getEquipmentTypesService(),
        },
        {
          queryKey: ["getEquipmentConditions"],
          queryFn: () => getEquipmentConditionsService(),
        },
      ],
    });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      manageEquipment: 1,
      equipmentType: (equipmentTypes || [])[0]?.value,
      manageType: "single",
      totalCount: "",
      underMaintanance: "",
      subTypes: [
        {
          subType: "",
          condition: "",
          equipmentNumber: "",
          id: 1,
        },
      ] as EquipmentRow[],
    },
  });

  const columns: GridColDef<EquipmentRow>[] = [
    {
      field: "id",
      headerName: "Action",
      flex: 0.1,
      renderCell: ({ row }) => (
        <IconButton
          onClick={() => {
            const newData = [
              ...(watch("subTypes")?.filter((item) => item.id !== row.id) ||
                []),
            ];
            register("subTypes").onChange({
              target: {
                value: [...newData],
                name: "subTypes",
              },
              type: "text",
            });
          }}
        >
          <Delete color="error" />
        </IconButton>
      ),
    },
    {
      field: "equipmentNumber",
      headerName: "Equipment Number",
      flex: 0.45,
      renderCell: ({ value, row }) => (
        <Box
          sx={{
            marginTop: "auto",
            marginBottom: "auto",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            value={value}
            size="small"
            sx={{ marginTop: "auto", marginBottom: "auto" }}
            type="text"
            onChange={(e) => {
              const newData = [
                ...(watch("subTypes")?.map((item) => {
                  if (item?.id === row.id) {
                    item.equipmentNumber = e.target.value;
                  }
                  return item;
                }) || []),
              ];
              register("subTypes").onChange({
                target: {
                  value: [...newData],
                  name: "subTypes",
                },
                type: "text",
              });
            }}
          />
        </Box>
      ),
    },
    {
      field: "condition",
      headerName: "Condition",
      flex: 0.45,
      renderCell: ({ value, row }) => (
        <Box
          sx={{
            marginTop: "auto",
            marginBottom: "auto",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SelectInput
            size={"small"}
            label="Condition"
            error={undefined}
            id={`condition${value.id}`}
            onBlur={register("subTypes").onBlur}
            name={`condition${value.id}`}
            value={value}
            items={equipmentConditions}
            onChange={(e) => {
              const newData = [
                ...(watch("subTypes")?.map((item) => {
                  if (item?.id === row.id) {
                    item.condition = e.target.value;
                  }
                  return item;
                }) || []),
              ];
              return register("subTypes").onChange({
                target: {
                  value: [...newData],
                  name: "subTypes",
                },
                type: "text",
              });
            }}
          />
        </Box>
      ),
    },
    {
      field: "subType",
      headerName: "Sub Type",
      flex: 0.45,
      renderCell: ({ value, row }) => (
        <Box
          sx={{
            marginTop: "auto",
            marginBottom: "auto",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={value}
            type="text"
            onChange={(e) => {
              const newData = [
                ...(watch("subTypes")?.map((item) => {
                  if (item?.id === row.id) {
                    item.subType = e.target.value;
                  }
                  return item;
                }) || []),
              ];
              register("subTypes").onChange({
                target: {
                  value: [...newData],
                  name: "subTypes",
                },
                type: "text",
              });
            }}
          />
        </Box>
      ),
    },
  ];

  console.log(watch("subTypes"));

  return (
    <Box display="flex" flexDirection="column" gap="16px">
      <>
        <SectionHeader title="Add Equipment" />
        <form>
          <Grid container gap={"16px"}>
            <Grid size={12}>
              <Grid size={4}>
                <SelectInput
                  items={equipmentTypes || []}
                  label="Equipment Type*"
                  required={true}
                  {...register("equipmentType")}
                  id="equipmentType"
                  value={watch("equipmentType")}
                  error={errors?.equipmentType as FieldError}
                />
              </Grid>
            </Grid>
            <Grid size={12} container spacing={2} alignItems={"center"}>
              <Grid size={4}>
                <RadioButtonGroup
                  items={manageEquipmentCheckBox}
                  label="Manage Equipment"
                  id="manageEquipment"
                  {...register("manageEquipment")}
                />
              </Grid>
              {watch("manageEquipment") == 1 && (
                <Grid size={4}>
                  <RadioButtonGroup
                    items={manageTypeCheckBox}
                    label="Manage Type"
                    id="manageType"
                    {...register("manageType")}
                  />
                </Grid>
              )}
              {watch("manageEquipment") == 0 && (
                <Grid size={3}>
                  <InputForm
                    label="Total Number"
                    type="number"
                    // disabled={true}
                    id="totalCount"
                    {...register("totalCount")}
                    placeholder="Enter the number"
                  />
                </Grid>
              )}
              {watch("manageEquipment") == 0 && (
                <Grid size={3}>
                  <InputForm
                    label="Under Maintanance"
                    type="number"
                    id="underMaintanance"
                    // disabled={true}
                    {...register("underMaintanance")}
                    placeholder="Enter the number"
                  />
                </Grid>
              )}
              {watch("manageEquipment") == 0 && (
                <Grid size={2}>
                  <Button
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                      color: "#0E5CDF",
                      width: "100%",
                      alignSelf: "flex-end",
                    }}
                  >
                    Add Sub Type
                  </Button>
                </Grid>
              )}
            </Grid>
            {watch("manageEquipment") == 1 && (
              <Grid
                size={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3">
                  Equipment Chart ({watch("subTypes").length})
                </Typography>
                <Button
                  sx={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}
                  onClick={() => {
                    register("subTypes").onChange({
                      target: {
                        value: [
                          ...watch("subTypes"),
                          {
                            subType: "",
                            condition: "",
                            equipmentNumber: "",
                            id: watch("subTypes").length + 1,
                          },
                        ],
                        name: "subTypes",
                      },
                      type: "text",
                    });
                  }}
                >
                  Add Equipments
                </Button>
              </Grid>
            )}
            {watch("manageEquipment") == 1 && (
              <Grid size={12} height={"59vh"}>
                <SecondaryDataGrid rows={watch("subTypes")} columns={columns} />
              </Grid>
            )}
          </Grid>
        </form>
      </>
    </Box>
  );
};

export default AddEquipment;
