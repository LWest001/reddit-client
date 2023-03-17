import { Box } from "@mui/material";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Embed, { defaultProviders } from "react-tiny-oembed";
import VideoPlaceholder from "./VideoPlaceholder";

function RichVideoWrapper({ richVideo, thumbnail }) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return (
    <Box
      className="VideoWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <LazyLoadComponent
        placeholder={<img src={thumbnail} />}
        threshold={screenHeight * 3}
      >
        <Embed
          className="richVideoEmbed"
          url={richVideo.url}
          providers={[...defaultProviders, richVideo.provider]}
          LoadingFallbackElement={
            <VideoPlaceholder
              thumbnail={{
                thumbnail_width: screenWidth - 32,
                thumbnail_height: screenWidth * 0.75 - 32,
              }}
            />
          }
          FallbackElement={
            <VideoPlaceholder
              thumbnail={{
                thumbnail_width: screenWidth - 32,
                thumbnail_height: screenWidth * 0.75 - 32,
              }}
            />
          }
          // proxy="https://cors-anywhere.herokuapp.com/"
        />
      </LazyLoadComponent>
    </Box>
  );
}
export default RichVideoWrapper;
