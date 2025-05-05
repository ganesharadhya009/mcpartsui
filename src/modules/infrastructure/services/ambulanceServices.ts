import apiUrlConstants from "../../global/constants/apiUrlConstants";
import { axiosInstance } from "../../global/services/gateway/axiosInstance";
import { AddAmbulanceFormType } from "../components/ambulance/AddAmbulance";

export const getFacilityApiService = async () => {
  const response = await axiosInstance.get(
    apiUrlConstants.GET_AMBULANCE_FACILITY_URL
  );
  return response.data.map((items: { description: string; id: number }) => ({
    value: items.id,
    label: items.description,
  }));
};

export const getAmbulanceOwnershipCheckBoxData = async () => {
  const response = await axiosInstance.get(apiUrlConstants.GET_OWNERSHIP_URL);
  return response.data.map((items: { description: string; id: number }) => ({
    value: items.id,
    label: items.description,
  }));
};

export const addAmbulanceApiService = async (data: AddAmbulanceFormType) => {
  const formData = {
    vehiclenumber: data.vehicleNumber,
    ownership: data.ownership,
    drivername: data.driverName,
    driverphone: data.driverNumber,
    ambulancefacilities: data.facilities?.map((item) => ({ facilityid: item })),
  };

  const response = await axiosInstance.post(
    apiUrlConstants.ADD_AMBULANCE_URL,
    formData
  );

  return response.data;
};
