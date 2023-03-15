import "./ImageModal.css";
import { setModal } from "../../features/ThreadList/threadListSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setStatus } from "../../features/Thread/threadSlice";
import { Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ImageModal(
  // { image, title, link }
  { open, handleClose, title, description, image }
) {
  const dispatch = useDispatch();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      // aria-labelledby={title}
      // aria-describedby={description}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <img src={image} alt={title} className="modalImage" />
        <Typography id={description} sx={{ mt: 2 }}>
          {description}
        </Typography>
      </Box>
    </Modal>
    // <Modal className="ImageModal">
    //   <div
    //     className="modalButton xButton"
    //     onClick={() =>
    //       dispatch(setModal({ image: "", title: "", link: "", display: false }))
    //     }
    //   >
    //     ×
    //   </div>
    //   <img src={image} alt={title} className="modalImage" />
    //   <Link
    //     to={`/${link.substring(19)}`}
    //     onClick={() => {
    //       dispatch(
    //         setModal({ image: "", title: "", link: "", display: false })
    //       );
    //       dispatch(setStatus("idle"));
    //     }}
    //   >
    //     <div className="modalButton commentBubble"></div>
    //   </Link>
    // </Modal>
  );
}

export default ImageModal;
