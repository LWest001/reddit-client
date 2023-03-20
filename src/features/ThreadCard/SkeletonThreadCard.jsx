import "./ThreadCard.css";
import {
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  Stack,
} from "@mui/material";

import theme from "../../assets/theme";

const SkeletonThreadCard = () => {
  return (
    <Card className="SkeletonThreadCard">
      <CardHeader
        className="ThreadCardHeader"
        avatar={
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
        }
        title={
          <Skeleton
            animation="wave"
            variant="text"
            width={200}
            className="skeletonContent"
          />
        }
        subheader={
          <Skeleton
            animation="wave"
            variant="text"
            width={100}
            className="skeletonContent"
          />
        }
      />

      <CardContent>
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="rounded" height={400} />
      </CardContent>
      <Stack
        direction="row"
        sx={{
          p: 1,
          justifyContent: "space-between",
          alignItems: "center",
          background: theme.palette.headerGradient.default
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          height="36px"
          width="220px"
        />

        <Stack direction="row" gap={1} sx={{alignItems:"center"}}>
          <Skeleton animation="wave" variant="rounded" width={20} height="1rem" />
          <Skeleton animation="wave" variant="text" width={100}/>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SkeletonThreadCard;
