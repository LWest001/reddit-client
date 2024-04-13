import {
  Card,
  Skeleton,
  Stack,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import ExpandCollapseButton from "./ExpandCollapseButton";
const HEADER_SKELETON_HEIGHT = "22.4px";
function SkeletonCommentCard() {
  return (
    <Card raised={true} className={"skeleton CommentCard"}>
      <CardHeader
        className="commentHeader"
        variant="commentCard"
        avatar={
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              py: 0,
            }}
          >
            <ExpandCollapseButton expanded={true} handleCollapse={() => {}} />
            {/* User avatar */}
            <Skeleton
              variant="rounded"
              width={HEADER_SKELETON_HEIGHT}
              height={HEADER_SKELETON_HEIGHT}
              animation="wave"
            />
          </Box>
        }
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Timestamp */}
            <Skeleton
              animation="wave"
              variant="text"
              width={"52px"}
              height="100%"
              sx={{ fontSize: "22.4px" }}
            />
            {/* Upvotes */}
            <Skeleton
              animation="wave"
              variant="text"
              width={"40px"}
              height="30px"
              sx={{ ml: "auto", fontSize: "22.4px" }}
            />
          </Stack>
        }
      />

      <CardContent sx={{ py: 0, px: "1rem" }}>
        {/* Body text */}
        <Skeleton animation="wave" variant="text" height="3rem" />
      </CardContent>
    </Card>
  );
}

export default SkeletonCommentCard;
