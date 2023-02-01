import "./ImageModal.css";
import { setModal } from "../../features/threadList/threadListSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setStatus, setPermalink } from "../../features/thread/threadSlice";

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
          dispatch(setStatus("idle"));
          dispatch(setPermalink(link));
        }}
      >
        <div className="modalButton commentBubble"></div>
      </Link>
    </div>
  );
}

export default ImageModal;
