import { Box } from "@mui/material";
import Embed, { defaultProviders } from "react-tiny-oembed";
import VideoPlaceholder from "./VideoPlaceholder";
import LazyLoad from "react-lazy-load";
import getRichVideoProviders from "../../../functions/getRichVideoProviders";

function RichVideoWrapper({ url, richVideo }) {
  const screenHeight = window.innerHeight;
  return (
    <Box
      className="VideoWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <LazyLoad offset={screenHeight * 3} width={"100%"}>
        <Embed
          className="richVideoEmbed"
          url={url}
          providers={[...defaultProviders, getRichVideoProviders(richVideo)]}
          LoadingFallbackElement={<VideoPlaceholder thumbnail={richVideo} />}
          FallbackElement={<VideoPlaceholder thumbnail={richVideo} disabled />}
          // proxy="https://cors-anywhere.herokuapp.com/"
        />
      </LazyLoad>
    </Box>
  );
}
export default RichVideoWrapper;
