function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      transition: ".25s",
      height: "1.4rem",
      width: "1.4rem",
      color: "white",
      textShadow:
        "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;",
      borderRadius: 1,
      ":hover": {
        width: "100%",
        padding: ".2rem",
        transition: ".25s",
      },
    },
    children: `${name.split("")[0]}`,
  };
}

export default stringAvatar;
