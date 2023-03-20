import {
  Skeleton,
  Card,
  Stack,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";

function SkeletonSearchCard() {
  return (
    <Card
      className="SearchCard"
      sx={{
        borderRadius: 0,
        my: 0,
        ":first-of-type": {
          borderTopLeftRadius: "calc(var(--radius) + var(--border))",
          borderTopRightRadius: "calc(var(--radius) + var(--border))",
          marginTop: "calc(var(--appbar-height) + 0.5rem)",
        },
        ":last-of-type": {
          borderBottomLeftRadius: "calc(var(--radius) + var(--border))",
          borderBottomRightRadius: "calc(var(--radius) + var(--border))",
        },
      }}
    >
      <CardHeader
        className="searchCardHeader"
        avatar={
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
        }
        title={
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Skeleton animation="wave" variant="text" width={160} />
            <Skeleton animation="wave" variant="text" width={80} />
          </Stack>
        }
        subheader={
          <Stack
            className="SearchStats"
            direction="row"
            gap={1}
            sx={{
              alignItems: "center",
            }}
          >
            <Stack direction="row" gap={1} sx={{alignItems:"center"}}>
              <Skeleton
                variant="rounded"
                width="20px"
                height="20px"
                animation="wave"
              />{" "}
              <Skeleton
                animation="wave"
                variant="text"
                width={50}
                height="30px"
              />
              <Skeleton
                variant="rounded"
                width="20px"
                height="20px"
                animation="wave"
              />{" "}
              <Skeleton
                animation="wave"
                variant="text"
                width={50}
                height="30px"
              />
            </Stack>
          </Stack>
        }
        sx={{
          borderRadius: 0,
          p: 0.5,
          background:
            "radial-gradient(ellipse at top left, #ffffff, lightgray)",
        }}
      />
      <CardContent className="threadPreview" sx={{ p: 0 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" width="100%" sx={{ m: 1 }}>
            <Skeleton
              animation="wave"
              variant="text"
              width="61px"
              height="30px"
              sx={{ mr: 1 }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height="30px"
            />
          </Stack>

          <Skeleton variant="rectangular" height={90} width={120} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SkeletonSearchCard;
