import { Box } from "@mui/material";
import Embed, { defaultProviders } from "react-tiny-oembed";
import VideoPlaceholder from "./VideoPlaceholder";
import LazyLoad from "react-lazy-load";

function RichVideoWrapper({ richVideo }) {
  const screenHeight = window.innerHeight;
  return (
    <Box
      className="VideoWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <LazyLoad offset={screenHeight * 3} width={"100%"}>
        <Embed
          className="richVideoEmbed"
          url={richVideo.url}
          providers={[...defaultProviders, richVideo.provider]}
          LoadingFallbackElement={
            <VideoPlaceholder thumbnail={richVideo.oembed} />
          }
          FallbackElement={
            <VideoPlaceholder thumbnail={richVideo.oembed} disabled />
          }
          // proxy="https://cors-anywhere.herokuapp.com/"
        />
      </LazyLoad>
    </Box>
  );
}
export default RichVideoWrapper;
