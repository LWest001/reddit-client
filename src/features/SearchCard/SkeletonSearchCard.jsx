import { Skeleton } from "@mui/material";

function SkeletonSearchCard() {
  return (
    <div className="SearchCard skeleton">
      <div className="searchCardBody">
        <div className="searchCardHeader">
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          ></Skeleton>
          <Skeleton
            animation="wave"
            className="subredditAndAuthor skeletonContent"
          ></Skeleton>
        </div>
        <div className="threadPreview">
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={30}
            className="threadTitle skeletonContent"
          />
        </div>
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={15}
          sx={{ fontSize: "10rem" }}
          className="searchCardFooter skeletonContent"
        />
      </div>

      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ height: "80px", width: "96px" }}
        // className="thumbnailContainer"
      ></Skeleton>
    </div>
  );
}

export default SkeletonSearchCard;
