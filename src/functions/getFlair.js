import replaceEntities from "./replaceEntities";

export function getFlair(data) {
  return {
    backgroundColor: data.link_flair_background_color,
    textColor: data.link_flair_text_color,
    text:
      replaceEntities(data.link_flair_richtext[0]?.t) ||
      replaceEntities(data.link_flair_richtext[1]?.t),
  };
}
