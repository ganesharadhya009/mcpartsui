import {
  Box,
  Button,
  colors,
  Grid2 as Grid,
  IconButton,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import SectionHeader from "../../common/components/SectionHeader";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  getEquipmentConditionsService,
  getEquipmentTypesService,
} from "../../infrastructure/services/equipmentServices";
import { FieldError, useForm } from "react-hook-form";
import SelectInput from "../../common/components/form/SelectInput";
import RadioButtonGroup from "../../common/components/form/RadioButtonGroup";
import { InputForm } from "../../common/components/form/InputForm";
import { GridColDef } from "@mui/x-data-grid";
import { BorderAllOutlined, BorderColor, CheckBox, Delete } from "@mui/icons-material";
import SecondaryDataGrid from "../../common/components/tables/SecondaryDataGrid";
import Breadcrumb from "../../common/components/Breadcrumbs";
import { useState } from "react";

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

const AddCustomer = () => {
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
      customerName: "",
      company:"",
      contactNumber: "",
      emailID: "",
      address: "",
    },
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  
  return (
    <Box display="flex" flexDirection="column" gap="16px">
      <Breadcrumb/>
      <>
        <SectionHeader title="Add Customer" />
        <form>
          <Grid container gap={"16px"}>
            <Grid size={12}>
              <Grid size={4}>
              <InputForm
                    label="Customer Name"
                    //type="number"
                    // disabled={true}
                    id="customerName"
                    {...register("customerName")}
                    placeholder="Enter the Customer Name"
                  />
              </Grid>
            </Grid>
            <Grid size={12} container spacing={2} alignItems={"center"}>
              <Grid size={4}>
              <InputForm
                    label="Company"
                    //type="number"
                    // disabled={true}
                    id="company"
                    {...register("company")}
                    placeholder="Enter the Company Name"
                  />
              </Grid>
              
                <Grid size={4}>
                <InputForm
                    label="Contact Number"
                    type="number"
                    // disabled={true}
                    id="contactNumber"
                    {...register("contactNumber")}
                    placeholder="Enter the Company Name"
                  />
                </Grid>
              
              
                <Grid size={3}>
                  <InputForm
                    label="Email"
                    //type="number"
                    // disabled={true}
                    id="emailID"
                    {...register("emailID")}
                    placeholder="Enter the number"
                  />
                </Grid>
                <Grid size={20} container spacing={3} alignItems={"center"}>
              <Box typography={"Address"} sx={{ width:400, height:300, border: "1px solid grey", borderRadius: "8px", textAlign: "center",
        borderColor: "lightblue", }}>
                 <Typography component="h1" textAlign={"left"}>
        Billing Address
      </Typography>
      <Grid size={13} container spacing={2} alignItems={"center"}>
                    <Grid size={11}>
                      <InputForm
                        label="Site/Plot No"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid>   
                    <Grid size={11}>
                      <InputForm
                        label="Streat/Area"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid>   
                    <Grid size={11}>
                      <InputForm
                        label="Town/City"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid>   
                    <Grid size={11}>
                      <InputForm
                        label="Pin Code"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid> 
                    </Grid>                     
                </Box>
                <Box typography={"Address"} sx={{ width:80, height:300, }}>
                <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          color="primary"
        />
      }
      label="Same as Billing"
    />

          </Box>
                <Box typography={"Address"} sx={{width:400, height:300,border: "1px solid grey", borderRadius: "8px", textAlign: "center",
        borderColor: "lightblue", }}>
                  <Typography component="h1" textAlign={"left"}>
        Shipping Address
      </Typography>
      <Grid size={13} container spacing={2} alignItems={"center"}>
                    <Grid size={11}>
                      <InputForm
                        label="Site/Plot No"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid>   
                    <Grid size={11}>
                      <InputForm
                        label="Streat/Area"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid>   
                    <Grid size={11}>
                      <InputForm
                        label="Town/City"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid>   
                    <Grid size={11}>
                      <InputForm
                        label="Pin Code"
                        //type="number"
                        id="address"
                        // disabled={true}
                        {...register("address")}
                        
                      />
                    </Grid> 
                    </Grid>                  
                </Box>
                </Grid> 
          </Grid>
          <Grid size={12} container spacing={2} alignItems={"center"}>
            <Grid size={4}>
                <Button
                variant="contained-green"
                sx={{ width: "158px" }}                          
                >
                    <Typography variant="body2">Save</Typography>
                </Button>
               
            </Grid>
            <Grid size={4}>
                <Button
                variant="contained-green"
                sx={{ width: "158px" }}                          
                >
                    <Typography variant="body2">Cancel</Typography>
                </Button>
            </Grid>
            
          </Grid>
          </Grid>
        </form>
      </>
    </Box>
  );
};

export default AddCustomer;
