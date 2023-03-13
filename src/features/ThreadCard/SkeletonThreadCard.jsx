import "./ThreadCard.css";
import { Skeleton } from "@mui/material";

const SkeletonThreadCard = () => {
  return (
    <div className="SkeletonThreadCard">
      <div className="threadCardHeader">
        <Skeleton variant="circular" width={50} height={50}></Skeleton>
        <div className="ThreadCardHeaderText">
          <Skeleton
            variant="text"
            width={200}
            className="skeletonContent"
          ></Skeleton>
          <Skeleton
            variant="text"
            width={100}
            className="skeletonContent"
          ></Skeleton>
        </div>
      </div>
      <div className="threadPreview">
        <Skeleton
          variant="text"
          className="threadTitle skeletonContent"
        ></Skeleton>
        <div className="threadContentPreview">
          <Skeleton
            variant="rectangular"
            height={400}
            className="skeletonImg skeletonContent"
          ></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default SkeletonThreadCard;
