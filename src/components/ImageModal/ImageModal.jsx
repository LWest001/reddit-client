import { useDispatch } from "react-redux";
import { Modal, Box, Typography, Stack, Button } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { selectThreadStatus } from "../../features/Thread/threadSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  width: "max-content",
  maxWidth: "100%",
  p: 4,
  maxHeight: "100%",
};

function ImageModal({ open, handleClose, title, link, image }) {
  const dispatch = useDispatch();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
            src={image}
            alt={title}
            className="modalImage"
          />
        </Box>
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Button
            component={Link}
            variant="contained"
            to={`/${link.substring(19)}`}
            onClick={() => {
              dispatch(selectThreadStatus("idle"));
            }}
          >
            <CommentOutlinedIcon />
          </Button>
          <Button variant="contained" disabled>
            <ShareIcon />
          </Button>
          <Button variant="contained" onClick={handleClose} color="warning">
            <CloseIcon />
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

/*
<Link
        to={`/${link.substring(19)}`}
        onClick={() => {
          dispatch(
            setModal({ image: "", title: "", link: "", display: false })
          );
          dispatch(setStatus("idle"));
        }}
      >
        <div className="modalButton commentBubble"></div>
      </Link>
*/

export default ImageModal;
