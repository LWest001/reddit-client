import replaceEntities from "./replaceEntities";

export function getFlair(data) {
  if (!data?.link_flair_text && !data?.link_flair_richtext) return;

  return {
    backgroundColor: data.link_flair_background_color,
    textColor: data.link_flair_text_color,
    text:
      data.link_flair_text ||
      replaceEntities(data?.link_flair_richtext[0]?.t) ||
      replaceEntities(data?.link_flair_richtext[1]?.t),
  };
}
