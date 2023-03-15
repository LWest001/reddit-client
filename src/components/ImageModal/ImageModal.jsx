import { useDispatch } from "react-redux";
import { Modal, Box, Typography, Stack, Button } from "@mui/material";
import { CommentOutlined, Share } from "@mui/icons-material";
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
  maxHeight: "100%",
  width: "max-content",
  maxWidth: "100%",
  p: 4,
};

function ImageModal({ open, handleClose, title, link, image }) {
  const dispatch = useDispatch();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <img
          style={{ maxHeight: "85vh", maxWidth: "100%" }}
          src={image}
          alt={title}
          className="modalImage"
        />
        <Stack direction="row" justifyContent="space-between">
          <Button
            component={Link}
            variant="contained"
            to={`/${link.substring(19)}`}
            onClick={() => {
              dispatch(selectThreadStatus("idle"));
            }}
          >
            <CommentOutlined />
          </Button>
          <Button variant="outlined" disabled>
            <Share/>
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
