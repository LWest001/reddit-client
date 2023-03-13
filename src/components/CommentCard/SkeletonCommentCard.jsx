import { Box, Skeleton } from "@mui/material";

function SkeletonCommentCard() {
  return (
    <div className={`skeleton CommentCard`}>
      <div className="commentHeader">
        <Skeleton
          variant="text"
          width={100}
          className="author skeletonContent"
        ></Skeleton>
        <Skeleton
          variant="text"
          width={100}
          className="timestamp skeletonContent"
        ></Skeleton>
        <div></div>
        <Skeleton className="score skeletonContent"></Skeleton>
      </div>
      <Box className="commentBody">
        <Skeleton
          variant="text"
          sx={{ width: "100%", mx: 1 }}
          className="commentBodyText skeletonContent"
        ></Skeleton>
      </Box>
    </div>
  );
}

export default SkeletonCommentCard;
