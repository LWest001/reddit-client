import "./ThreadCard.css";
import "./SkeletonThreadCard.css";

const SkeletonThreadCard = () => {
  return (
    <div className="SkeletonThreadCard">
      <div className="threadCardHeader">
        <div className="subredditIcon"></div>
        <div className="ThreadCardHeaderText">
          <p className="skeletonContent">...................................</p>
          <p className="skeletonContent">...............</p>
        </div>
      </div>
      <div className="threadPreview">
        <h2 className="threadTitle skeletonContent">
          ...................................
        </h2>
        <div className="threadContentPreview">
          <div className="skeletonImg skeletonContent"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonThreadCard;
