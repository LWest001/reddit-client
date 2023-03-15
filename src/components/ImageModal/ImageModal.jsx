import { useDispatch } from "react-redux";
import { Modal, Box, Typography, Stack, Button  } from "@mui/material";
import { CommentOutlined  } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "100%",
  p: 4,
};

function ImageModal(
  // { image, title, link }
  { open, handleClose, title, description, image }
) {
  const dispatch = useDispatch();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <img style={{maxHeight:"85vh", maxWidth: "100%"}} src={image} alt={title} className="modalImage" />
        <Stack direction="row" justifyContent="space-between">
          <Button component="a" variant="contained">
            <CommentOutlined/>
          </Button>
          <Button variant="outlined" disabled>
            Share
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default ImageModal;
