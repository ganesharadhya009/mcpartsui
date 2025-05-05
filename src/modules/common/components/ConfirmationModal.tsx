import {
  Box,
  Button,
  Modal,
  SvgIconTypeMap,
  SxProps,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  sx: SxProps;
  title?: string;
  desc?: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
}
const ConfirmationModal = ({
  open,
  handleClose,
  sx,
  title,
  desc,
  onConfirm,
  icon: DisplayIcon,
}: ConfirmationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "24px",
          gap: "10px",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        }}
      >
        {DisplayIcon && <DisplayIcon sx={{ width: "100px", height: "auto" }} />}
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body2">{desc}</Typography>
        <Box
          display="flex"
          margin="auto"
          justifyContent="space-around"
          width="80%"
        >
          <Button onClick={handleClose} variant="outlined-green">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained-green">
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
