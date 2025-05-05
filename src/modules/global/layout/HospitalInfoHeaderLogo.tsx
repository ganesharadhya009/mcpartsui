import { Box, Typography, TypographyVariant } from "@mui/material";
import mcpartslogo from "../assets/icons/mcParts-edited-logo.png";
import globalConstant from "../constants/globalConstants";
import styleConstant from "../constants/styleConstants";

/**
 * HospitalInfoData
 *
 * This component displays the hospital logo and its name.
 * It is designed to adjust the opacity of the hospital name based
 * on the open state passed as a prop.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} props.open - A boolean indicating whether the component
 * should display its content (affecting opacity).
 *
 * @returns {JSX.Element} The rendered hospital information.
 */
const HospitalInfoHeaderLogo = ({ open }: { open: boolean }) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={"10px"}
      paddingTop={"16px"}
    >
      <img
        src={mcpartslogo}
        className="hospital-logo-header"
        alt={globalConstant.MCPARTS_LOGO_ALT_TEXT}
      />
      <Typography
        sx={{ ...(open ? { opacity: 1 } : { opacity: 0 }) }}
        variant={styleConstant.TEXT_VARIENT_H2 as TypographyVariant}
      >
        {globalConstant.PORTAL_NAME_TEXT}
      </Typography>
    </Box>
  );
};

export default HospitalInfoHeaderLogo;
