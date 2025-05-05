import {
  AmbulanceNotFoundContainer,
  AmbulanceNotFoundImageHolder,
} from "../../styles/styles";
import ambulanceNotFoundLogo from "../../../global/assets/icons/locations-not-found.svg";
import { Button, Typography } from "@mui/material";
import infrastructureConstants from "../../constants";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../global/constants/routesConstants";

const AmbulanceNoDataFound = () => {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate(routeNames.addAmbulancePage);
  };

  return (
    <AmbulanceNotFoundContainer>
      <AmbulanceNotFoundImageHolder
        src={ambulanceNotFoundLogo}
        alt="ambulance not found"
      />
      <Typography variant="body1">
        {infrastructureConstants.AMBULANCE_NOT_FOUND_TEXT}
      </Typography>
      <Button onClick={handleRedirection} variant="contained-green">
        {infrastructureConstants.ADD_AMBULANCE_BUTTON_TEXT}
      </Button>
    </AmbulanceNotFoundContainer>
  );
};

export default AmbulanceNoDataFound;