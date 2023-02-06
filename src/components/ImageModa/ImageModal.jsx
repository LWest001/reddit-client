import "./ImageModal.css";
import { setModal } from "../../features/ThreadList/threadListSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setStatus } from "../../features/Thread/threadSlice";

function ImageModal({ image, title, link }) {
  const dispatch = useDispatch();
  return (
    <div className="ImageModal">
      <div
        className="modalButton xButton"
        onClick={() =>
          dispatch(setModal({ image: "", title: "", link: "", display: false }))
        }
      >
        ×
      </div>
      <img src={image} alt={title} className="modalImage" />
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
    </div>
  );
}

export default ImageModal;
