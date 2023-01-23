export const getThreadType = (data) => {
  if (data.is_gallery) {
    return "gallery";
  }
  if (data.is_self) {
    return "self";
  }
  if (data.post_hint) {
    switch (data.post_hint) {
      case "image":
        return "image";
      case "hosted:video":
        return "video";
      case "link":
        return "link";
      case "self":
        return "self";
      case "rich:video":
        return "richVideo";
    }
  }
  return "link";
};
