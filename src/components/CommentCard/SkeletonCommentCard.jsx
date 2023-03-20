import {
  Box,
  Card,
  Skeleton,
  Stack,
  CardHeader,
  CardContent,
} from "@mui/material";
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Skeleton
              animation="wave"
              variant="text"
              width={100}
              height="30px"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={100}
              height="30px"
            />
          </Stack>
        }
      />

      <CardContent sx={{p:"0.5rem !important"}}>
        <Skeleton
          animation="wave"
          variant="text"
          height="3rem"
        />
      </CardContent>
    </Card>
  );
}

export default SkeletonCommentCard;
