import { Box } from "@mui/material";
import ReactPlayer from "react-player";
import isiOS from "../../../functions/isiOS";

function DashVideoWrapper({ video, previewUrl }) {
  console.log(previewUrl);
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
      className="DashVideoWrapper"
    >
      <ReactPlayer
        url={isiOS() ? video.hls : video.dashManifest}
        controls={true}
        width="100%"
        maxheight="80vh"
        playsinline={true}
        volume={1}
        muted={true}
        autoPlay={false}
        light={previewUrl}
        fallback={
          <video>
            <source src={video.fallback} type="video/mp4" />
          </video>
        }
      />
    </Box>
  );
}
export default DashVideoWrapper;
