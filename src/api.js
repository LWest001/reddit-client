import axios from "axios";
import replaceEntities from "./functions/replaceEntities";
import { getSetting } from "./functions/getSetting";

export async function getThreads(options) {
  const { sort = "hot", subreddit, query, after } = options;
  const baseURL = "https://www.reddit.com";
  let URL;
  if (subreddit) {
    if (sort) {
      URL = `/r/${subreddit}/${sort}.json`;
    } else {
      URL = `/r/${subreddit}.json`;
    }
  } else if (query) {
    URL = `/search.json?q=${query}&sort=${sort}`;
  } else {
    URL = `/${sort}.json`;
  }

  if (after) {
    if (query) {
      URL = `${URL}&after=${after}`;
    } else {
      URL = `${URL}?after=${after}`;
    }
  }

  const response = await axios.get(baseURL + URL);
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
  searchWithin,
}) {
  const baseURL = "https://www.reddit.com";
  const conditionalAfter = after ? "after=" + after : "";
  const conditionalTime = time ? "&t=" + time : "";
  let URL;
  if (subreddit) {
    if (searchWithin && subreddit) {
      URL = `/r/${subreddit}/search.json?q=${query}&sort=${sort}&${conditionalAfter}${conditionalTime}&restrict_sr=on`;
    } else if (sort) {
      URL = `/r/${subreddit}/${sort}.json?${conditionalAfter}${conditionalTime}`;
    } else {
      URL = `/r/${subreddit}.json?${conditionalAfter}${conditionalTime}`;
    }
  } else if (query) {
    URL = `/search.json?q=${query}&sort=${sort}&${conditionalAfter}${conditionalTime}`;
  } else {
    URL = `/${sort}.json?${conditionalAfter}${conditionalTime}`;
  }

  const response = await axios.get(baseURL + URL);

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
  const baseURL = "https://www.reddit.com";
  const url = `/r/${subreddit}/comments/${id}.json?sort=${sort}`;
  const response = await axios.get(baseURL + url);
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
  const URL = `https://www.reddit.com/r/${subreddit}/about.json`;
  const response = await axios.get(URL);
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
    const URL = `https://www.reddit.com/r/${subreddit}/about.json`;
    const response = await axios.get(URL, {
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
