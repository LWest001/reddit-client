import {
  Box,
  Card,
  Skeleton,
  Stack,
  CardHeader,
  CardContent,
} from "@mui/material";
import CommentHeaderText from "./CommentHeaderText";
function SkeletonCommentCard() {
  return (
    <Card raised={true} className={`skeleton CommentCard`}>
      <CardHeader
        className="commentHeader"
        variant="commentCard"
        avatar={
          <Skeleton
            variant="rounded"
            width="22px"
            height="22px"
            animation="wave"
          />
        }
        title={
          <Stack direction="row" justifyContent="space-between">
            <Skeleton
              animation="wave"
              variant="text"
              width={100}
              className="timestamp skeletonContent"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={100}
              className="timestamp skeletonContent"
            />
          </Stack>
        }
      />

      <CardContent>
        <Skeleton
          animation="wave"
          variant="text"
          // sx={{ width: "100%", mx: 1 }}
          className="commentBodyText skeletonContent"
        />
      </CardContent>
    </Card>
  );
}

export default SkeletonCommentCard;
