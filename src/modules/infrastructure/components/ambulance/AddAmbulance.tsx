import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import Breadcrumb from "../../../common/components/Breadcrumbs";
import SectionHeader from "../../../common/components/SectionHeader";
import { InputForm } from "../../../common/components/form/InputForm";
import RadioButtonGroup from "../../../common/components/form/RadioButtonGroup";
import { FieldError, useForm } from "react-hook-form";
import FormActionToolBar from "../../../common/components/FormActionToolBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAmbulabceValidationSchema } from "../../schema/addAmbulanceValidationSchema";
import SelectInput from "../../../common/components/form/SelectInput";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import LoadingFullScreen from "../../../common/components/LoadingFullScreen";
import {
  addAmbulanceApiService,
  getAmbulanceOwnershipCheckBoxData,
  getFacilityApiService,
} from "../../services/ambulanceServices";
import ConfirmationModal from "../../../common/components/ConfirmationModal";
import { useState } from "react";
import { Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../global/constants/routesConstants";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import successToast from "../../../global/utils/SuccessToast";
import errorToast from "../../../global/utils/ErrorToast";
import { AddAmbulaceContainer, FormDivider } from "../../styles/styles";
import globalConstant from "../../../global/constants/globalConstants";
import infrastructureConstants from "../../constants";

export interface AddAmbulanceFormType {
  facilities?: string[];
  ownership?: string;
  vehicleNumber?: string;
  driverName?: string;
  driverNumber?: string;
}

const AddAmbulance = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { data: facilities, isPending } = useSuspenseQuery({
    queryKey: ["getFacity"],
    queryFn: () => getFacilityApiService(),
  });

  const { data: checkBoxItems, isPending: isLoading } = useSuspenseQuery({
    queryKey: ["getOwnershipCheckBoxData"],
    queryFn: () => getAmbulanceOwnershipCheckBoxData(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      facilities: [],
      ownership: checkBoxItems[0].value,
      vehicleNumber: "",
      driverName: "",
      driverNumber: "",
    },
    resolver: yupResolver(addAmbulabceValidationSchema),
  });

  const { mutate, isPending: addAmbulanceLoading } = useMutation({
    mutationKey: ["addAmbulance"],
    mutationFn: (data: AddAmbulanceFormType) => addAmbulanceApiService(data),
    onSuccess: () => {
      successToast({
        message: infrastructureConstants.AMBULANCE_ADD_SUCCESS_MESSAGE,
      });
      navigate(routeNames.ambulance);
    },
    onError: (error) => {
      errorToast({ message: error.message });
    },
  });

  const onSubmit = (formData: AddAmbulanceFormType) => {
    mutate(formData);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    navigate(routeNames.ambulance);
  };

  return (
    <AddAmbulaceContainer>
      <Breadcrumb />
      <SectionHeader
        title={infrastructureConstants.ADD_AMBULANCE_SECTION_TITLE}
      />
      {isPending || isLoading ? (
        <LoadingFullScreen />
      ) : (
        <Box sx={{ pb: 10 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1} gap={"24px"}>
              <Grid size={12}>
                <Grid size={{ lg: 4, md: 4, sm: 12 }}>
                  <InputForm
                    id="vehicleNumber"
                    label={"Vehicle Number"}
                    placeholder="Enter Vehicle Number"
                    error={errors?.vehicleNumber}
                    {...register("vehicleNumber")}
                    onkeydown={(e) => {
                      const regex = /^[A-Za-z0-9]*$/;
                      if (!regex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Grid size={12}>
                <Grid size={{ lg: 4, md: 4, sm: 12 }}>
                  <RadioButtonGroup
                    id="ownership"
                    items={checkBoxItems || []}
                    label="Ownership"
                    {...register("ownership")}
                  />
                </Grid>
              </Grid>
              <Grid size={12}>
                <FormDivider />
              </Grid>
              <Grid size={12} gap={"24px"}>
                <Typography variant="h3">Driver Information</Typography>
              </Grid>
              <Grid size={{ lg: 4, md: 4, sm: 12 }}>
                <InputForm
                  id="driverName"
                  label={"Name"}
                  error={errors?.driverName as FieldError}
                  value={watch("driverName")}
                  {...register("driverName")}
                  onkeydown={(e) => {
                    const regex = /^[A-Za-z0-9 ]*$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Grid>
              <Grid size={{ lg: 4, md: 4, sm: 12 }}>
                <InputForm
                  prefixText={
                    <Typography
                      color="#344054"
                      variant="body1"
                      width={"36px"}
                      paddingRight={"8px"}
                      borderRight={"1px solid #D0D5DD"}
                    >
                      +91
                    </Typography>
                  }
                  label={"Mobile Number"}
                  id="driverNumber"
                  error={errors?.driverNumber}
                  {...register("driverNumber")}
                  type="number"
                  onkeydown={(e) => {
                    const currentValue = watch("driverNumber");
                    const isNumber = /^[0-9]$/.test(e.key);
                    if (isNumber && currentValue.length >= 10) {
                      e.preventDefault();
                    }
                  }}
                  min={0}
                />
              </Grid>
              <Grid size={12} gap={"24px"}>
                <Typography variant="h3">Facilities</Typography>
              </Grid>
              <Grid size={{ lg: 4, md: 4, sm: 12 }}>
                <SelectInput
                  id="facilities"
                  {...register("facilities")}
                  error={errors?.facilities as FieldError}
                  items={facilities || []}
                  label="Facilities"
                  value={watch("facilities")}
                  multiple={true}
                />
              </Grid>
            </Grid>
            <FormActionToolBar>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Button
                  onClick={
                    isDirty ? handleOpen : () => navigate(routeNames.ambulance)
                  }
                  disabled={addAmbulanceLoading}
                  variant="outlined-green"
                >
                  {globalConstant.CANCEL_TEXT}
                </Button>
                <Button
                  disabled={addAmbulanceLoading}
                  type="submit"
                  variant="contained-green"
                >
                  {addAmbulanceLoading ? (
                    <LoadingSpinner size="24px" />
                  ) : (
                    globalConstant.SUBMIT_TEXT
                  )}
                </Button>
              </Box>
            </FormActionToolBar>
          </form>
        </Box>
      )}
      <ConfirmationModal
        open={isOpen}
        handleClose={handleClose}
        sx={{ width: "500px", height: "300px" }}
        title={globalConstant.CANCEL_CONFIRM_TITLE}
        desc={globalConstant.CANCEL_CONFIRM_DESC}
        icon={Cancel}
        onConfirm={handleConfirm}
      />
    </AddAmbulaceContainer>
  );
};

export default AddAmbulance;
