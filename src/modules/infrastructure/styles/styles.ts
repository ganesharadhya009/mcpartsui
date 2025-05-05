import { Box, Divider, styled } from "@mui/material";

export const AmbulanceNotFoundContainer = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
}));

export const AmbulanceNotFoundImageHolder = styled("img")(() => ({
  width: "230px",
  height: "197px",
}));

export const AddAmbulaceContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
}));

export const FormDivider = styled(Divider)(() => ({
  border: "1px solid #EAECF0",
}));