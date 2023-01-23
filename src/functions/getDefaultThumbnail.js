import defaultThumb from "../assets/defaultThumb.png";
import selfThumb from "../assets/selfThumb.png";
import nsfwThumb from "../assets/nsfwThumb.png";

function getDefaultThumbnail(thumbnail) {
  if (thumbnail === "default" || thumbnail === "spoiler") {
    return defaultThumb;
  }
  if (thumbnail === "self" || !thumbnail) {
    return selfThumb;
  }
  if (thumbnail === "nsfw") {
    return nsfwThumb;
  }
  return thumbnail;
}

export default getDefaultThumbnail;
