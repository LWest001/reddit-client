import { getTimeStamp } from "./getTimeStamp";
import providers from "../assets/providers.json";

function filterThreadData(data, threadType) {
  return {
    author: data.author,
    commentCount: data.num_comments,
    gallery: threadType === "gallery" && data.url,
    image: threadType === "image" && data.url,
    imagePreview:
      ["image", "video"].includes(threadType) &&
      data.preview.images[0].resolutions,
    id: data.id,
    link: "https://reddit.com" + data.permalink,
    postFlair: {
      backgroundColor: data.link_flair_background_color,
      textColor: data.link_flair_text_color,
      text: data.link_flair_richtext[0]?.t || data.link_flair_richtext[1]?.t,
    },
    redditId: data.name,
    richVideo: threadType === "richVideo" && {
      oembed: data.media.oembed,
      url: data.url,
      provider: providers.find(
        (provider) => provider.provider_name === data.media.oembed.provider_name
      ),
    },
    score: data.score,
    selfText: threadType === "self" && data.selftext,
    subredditName: data.subreddit,
    threadTitle: data.title,
    threadType: threadType,
    thumbnail: data.thumbnail,
    timestamp: getTimeStamp(data.created_utc),
    url: data.url,
    video: threadType === "video" && {
      dashManifest: data.media.reddit_video.dash_url.substring(0, 48),
      fallback: data.media.reddit_video.fallback_url,
      hls: data.media.reddit_video.hls_url,
    },
  };
}

export default filterThreadData;
