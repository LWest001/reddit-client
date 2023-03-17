import { Box, Skeleton, Stack } from "@mui/material";

function SkeletonCommentCard() {
  return (
    <div className={`skeleton CommentCard`}>
      <div className="commentHeader">
        <Stack direction="row" gap={2}>
          <Skeleton
            animation="wave"
            variant="text"
            width={20}
            className="author skeletonContent"
          />
          <Skeleton
            animation="wave"
            variant="text"
            width={100}
            className="timestamp skeletonContent"
          />
          <Box sx={{ width: "100%" }} />
          <Skeleton
            animation="wave"
            variant="text"
            width={100}
            className="timestamp skeletonContent"
          />
        </Stack>
      </div>
      <Box className="commentBody">
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ width: "100%", mx: 1 }}
          className="commentBodyText skeletonContent"
        />
      </Box>
    </div>
  );
}

export default SkeletonCommentCard;
