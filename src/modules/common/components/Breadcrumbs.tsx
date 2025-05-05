import { Breadcrumbs, IconButton, Link } from "@mui/material";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import navItems from "../../global/constants/navItems";
import { ArrowBack } from "@mui/icons-material";
import {
  breadCrumbsIconButtonStyles,
  BreadCrumbsWrapper,
} from "../styles/styles";
import { generateBreadcrumbs } from "../utils/generateBreadCrumbs";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const breadcrumbs = generateBreadcrumbs(location, navItems);
  const handleGoback = () => navigate(-1);

  return (
    <BreadCrumbsWrapper>
      <IconButton onClick={handleGoback} sx={breadCrumbsIconButtonStyles}>
        <ArrowBack />
      </IconButton>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            component={RouterLink}
            to={breadcrumb.path}
            underline="hover"
            typography="body2"
            fontWeight={600}
            textTransform={"capitalize"}
            color={index === breadcrumbs.length - 1 ? "#667085" : "#167A5F"}
          >
            {breadcrumb.text}
          </Link>
        ))}
      </Breadcrumbs>
    </BreadCrumbsWrapper>
  );
};

export default Breadcrumb;
