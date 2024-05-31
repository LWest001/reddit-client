import axios from "axios";
import replaceEntities from "./functions/replaceEntities";
import { getSetting } from "./functions/getSetting";

const baseUrl = "api";

export async function getThreads(options) {
  const { sort = "hot", subreddit, query, after } = options;
  let Url;
  if (subreddit) {
    if (sort) {
      Url = `/r/${subreddit}/${sort}.json`;
    } else {
      Url = `/r/${subreddit}.json`;
    }
  } else if (query) {
    Url = `/search.json?q=${query}&sort=${sort}`;
  } else {
    Url = `/${sort}.json`;
  }

  if (after) {
    if (query) {
      Url = `${Url}&after=${after}`;
    } else {
      Url = `${Url}?after=${after}`;
    }
  }
  console.log(baseUrl + Url);
  const response = await axios.get(baseUrl + Url);
  return {
    threads: response.data.data.children,
    after: response.data.data.after,
    query,
    subreddit,
  };
}

export async function getInfiniteThreads({
  after,
  sort = "hot",
  subreddit,
  query,
  time,
}) {
  const conditionalAfter = after ? "after=" + after : "";
  const conditionalTime = time ? "&t=" + time : "";
  let Url;
  if (subreddit) {
    if (sort) {
      Url = `/r/${subreddit}/${sort}.json?${conditionalAfter}${conditionalTime}`;
    } else {
      Url = `/r/${subreddit}.json?${conditionalAfter}${conditionalTime}`;
    }
  } else if (query) {
    Url = `/search.json?q=${query}&sort=${sort}&${conditionalAfter}${conditionalTime}`;
  } else {
    Url = `/${sort}.json?${conditionalAfter}${conditionalTime}`;
  }

  const response = await axios.get(baseUrl + Url);

  return {
    threads: response.data.data.children,
    after: response.data.data.after,
    query,
    subreddit,
  };
}
export async function getInfiniteComment({
  subreddit,
  threadId,
  threadTitle,
  ids,
}) {
  const responses = await Promise.allSettled(
    ids.map(async (id) => await getReply(subreddit, threadId, threadTitle, id))
  ).catch((e) => {
    throw e;
  });
  return responses;
}

export async function getThread(subreddit, id, sort = "hot") {
  const baseUrl = "https://www.reddit.com";
  const url = `/r/${subreddit}/comments/${id}.json?sort=${sort}`;
  const response = await axios.get(baseUrl + url);
  return {
    thread: response.data[0].data.children[0].data,
    comments: response.data[1].data.children,
  };
}

export async function getReply(subreddit, threadId, threadTitle, replyId) {
  const url = `https://www.reddit.com/r/${subreddit}/comments/${threadId}/${threadTitle}/${replyId}.json`;
  const response = await axios.get(url);
  return response.data[1].data.children[0].data;
}

export async function getSubreddits(query) {
  const url = `https://www.reddit.com/search.json?q=${query}&type=sr`;
  const response = await axios.get(url);
  return response.data.data || {};
}

export async function getSubredditInfo(subreddit) {
  const Url = `https://www.reddit.com/r/${subreddit}/about.json`;
  const response = await axios.get(Url);
  return response?.data?.data;
}

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
export async function fetchIcon(subreddit, signal, delay) {
  if (!subreddit) return null;
  const doNotCheck = sessionStorage.getItem(subreddit);

  if (doNotCheck) {
    return {
      subreddit: subreddit,
      icon: null,
    };
  }
  const localIcon = localStorage.getItem(subreddit);

  if (localIcon && localIcon !== "null" && localIcon !== "undefined") {
    return {
      subreddit: subreddit,
      icon: localIcon,
    };
  }

  let icon;
  await sleep(delay);
  if (!signal?.aborted) {
    const loadNew = getSetting("loadNew");

    if (loadNew === "false" || loadNew === false) return null;
    const Url = `https://www.reddit.com/r/${subreddit}/about.json`;
    const response = await axios.get(Url, {
      headers: "Access-Control-Allow-Origin",
    });

    icon =
      replaceEntities(response.data.data.community_icon) ||
      replaceEntities(response.data.data.icon_img);
    localStorage.setItem(subreddit, icon || null);
    if (!icon) {
      sessionStorage.setItem(subreddit, true);
    }
    return {
      subreddit: subreddit,
      icon: icon || null,
    };
  }
}
