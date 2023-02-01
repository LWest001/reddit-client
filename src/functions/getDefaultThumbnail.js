import defaultThumb from "../assets/defaultThumb.png";
import selfThumb from "../assets/selfThumb.png";
import nsfwThumb from "../assets/nsfwThumb.png";
import spoilerThumb from "../assets/spoilerThumb.png";

function getDefaultThumbnail(thumbnail) {
  if (thumbnail === "default" || thumbnail === "image") {
    return defaultThumb;
  }
  if (thumbnail === "spoiler") {
    return spoilerThumb;
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
