import "./ThreadCard.css";
import {
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Box,
  useTheme,
} from "@mui/material";


const SkeletonThreadCard = ({ subreddit }) => {
  const theme = useTheme();
  return (
    <Card className="SkeletonThreadCard">
      <CardHeader
        className="ThreadCardHeader"
        avatar={
          !subreddit && (
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
            />
          )
        }
        title={
          <Box display="flex" width={"100%"} justifyContent="space-between">
            <Skeleton
              animation="wave"
              variant="text"
              width={100}
              className="skeletonContent"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={50}
              ml={"100%"}
              className="skeletonContent"
            />
          </Box>
        }
        subheader={
          !subreddit && (
            <Skeleton
              animation="wave"
              variant="text"
              width={200}
              className="skeletonContent"
            />
          )
        }
      />

      <CardContent>
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="rounded" height={200} />
      </CardContent>
      <Stack
        direction="row"
        sx={{
          p: 1,
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.palette.headerGradient.default,
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          height="1rem"
          width="220px"
        />

        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={20}
            height="1rem"
          />
          <Skeleton animation="wave" variant="text" width={100} />
        </Stack>
      </Stack>
    </Card>
  );
};

export default SkeletonThreadCard;
