import * as Yup from "yup";

export const addAmbulabceValidationSchema = Yup.object({
  facilities: Yup.array()
    .min(1, "At least one facility must be selected")
    .required("Facilities are required"),
  ownership: Yup.string().required("Ownership is required"),
  vehicleNumber: Yup.string()
    .matches(
      /^[A-Za-z0-9]+$/,
      "Vehicle number can only contain letters and numbers"
    )
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/,
      "Vehicle number must contain at least one letter and one number"
    )
    .min(5, "Should have at least 5 characters")
    .required("Vehicle number is required"),
  driverName: Yup.string().min(5,"Minimum length 5").required("Driver name is required"),
  driverNumber: Yup.string()
    .matches(
      /^[6-9]\d{9}$/,
      "Mobile number must be a 10-digit number starting with 6, 7, 8, or 9"
    )
    .required("Mobile number is required"),
});
