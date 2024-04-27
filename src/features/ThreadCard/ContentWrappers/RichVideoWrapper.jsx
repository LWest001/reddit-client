import { Box } from "@mui/material";
import Embed, { defaultProviders } from "react-tiny-oembed";
import VideoPlaceholder from "./VideoPlaceholder";

import getRichVideoProviders from "../../../functions/getRichVideoProviders";

function RichVideoWrapper({ url, richVideo }) {

  return (
    <Box
      className="VideoWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <Embed
        className="richVideoEmbed"
        url={url}
        providers={[...defaultProviders, getRichVideoProviders(richVideo)]}
        LoadingFallbackElement={<VideoPlaceholder thumbnail={richVideo} />}
        FallbackElement={<VideoPlaceholder thumbnail={richVideo} disabled />}
        // proxy="https://cors-anywhere.herokuapp.com/"
      />
    </Box>
  );
}
export default RichVideoWrapper;
