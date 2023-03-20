import { Typography } from "@mui/material";

function SearchFlair({ threadType }) {
  const settings = {
    bgcolor: null,
    text: null,
  };

  if (threadType === "image") {
    settings.text = "Image";
    settings.bgcolor = "lightblue";
  } else if (threadType === "link") {
    settings.text = "Link";
    settings.bgcolor = "lightcoral";
  } else if (threadType === "self") {
    settings.text = "Text";
    settings.bgcolor = "plum";
  } else if (threadType === "link") {
    settings.text = "Gallery";
    settings.bgcolor = "palegreen";
  } else if (threadType === "video") {
    settings.text = "Video";
    settings.bgcolor = "papayawhip";
  }

  return (
    <Typography
      sx={{ bgcolor: settings.bgcolor, mr: 1, fontWeight: "bold"}}
      className="postFlair"
    >
      {settings.text}
    </Typography>
  );
}

export default SearchFlair;
