import {
  PlayCircleFilledRounded as PlayArrow,
  PlayDisabledRounded as PlayDisabled,
} from "@mui/icons-material";
import { Box, Icon, Skeleton } from "@mui/material";

function VideoPlaceholder({ thumbnail, disabled = false }) {
  const { thumbnail_width, thumbnail_height } = thumbnail;
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
      }}
    >
      <Icon
        fontSize="large"
        sx={{ position: "relative", top: thumbnail_height / 2 + 14 }}
      >
        {disabled ? (
          <PlayDisabled fontSize="large" />
        ) : (
          <PlayArrow fontSize="large" />
        )}
      </Icon>
      <Skeleton
        variant="rounded"
        width={thumbnail_width}
        height={thumbnail_height}
        alt="Loading rich video content..."
        animation={disabled ? "none" : "wave"}
        sx={{ maxWidth: "100%" }}
      ></Skeleton>
    </Box>
  );
}

export default VideoPlaceholder;
