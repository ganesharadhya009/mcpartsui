import { Typography, TypographyVariant } from "@mui/material";
import { SectionHeadingWrapper } from "../styles/styles";
import styleConstant from "../../global/constants/styleConstants";

type SectionHeaderPropsType = {
  /** The title to be displayed in the section header */
  title: string;
};

/**
 * SectionHeader Component
 *
 * This component renders a section header with a title. It uses the
 * Material-UI Typography component for styling. The section header
 * can be used to introduce different sections of a page, enhancing
 * the overall layout and readability of the application.
 *
 * @param {SectionHeaderPropsType} props - The props for the component.
 * @param {string} props.title - The title to display in the header.
 * @returns {JSX.Element} The rendered section header.
 */
const SectionHeader = ({ title }: SectionHeaderPropsType) => {
  return (
    <SectionHeadingWrapper>
      <Typography
        variant={styleConstant.TYPOGRAPHY_VARIANT_H5 as TypographyVariant}
      >
        {title}
      </Typography>
    </SectionHeadingWrapper>
  );
};

export default SectionHeader;
