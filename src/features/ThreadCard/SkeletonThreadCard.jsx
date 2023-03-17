import "./ThreadCard.css";
import { Skeleton } from "@mui/material";

const SkeletonThreadCard = () => {
  return (
    <div className="SkeletonThreadCard">
      <div className="threadCardHeader">
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          animation="wave"
        ></Skeleton>
        <div className="ThreadCardHeaderText">
          <Skeleton
            animation="wave"
            variant="text"
            width={200}
            className="skeletonContent"
          ></Skeleton>
          <Skeleton
            animation="wave"
            variant="text"
            width={100}
            className="skeletonContent"
          ></Skeleton>
        </div>
      </div>
      <div className="threadPreview">
        <Skeleton
          animation="wave"
          variant="text"
          className="threadTitle skeletonContent"
        ></Skeleton>
        <div className="threadContentPreview">
          <Skeleton
            animation="wave"
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
