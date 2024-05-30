import React from "react";
import ThreadCard from "../ThreadCard";
import { useQuery } from "@tanstack/react-query";
import { fetchIcon } from "../../../api";
import { IconsContext } from "../../ThreadList/ThreadList";

const CrosspostWrapper = ({ data }) => {
  const { data: icon } = useQuery({
    queryFn: () => fetchIcon(data.subreddit),
    queryKey: ["icon", [data.subreddit]],
  });
  return (
    <IconsContext.Provider value={{ data: { [data.subreddit]: icon?.icon } }}>
      <ThreadCard data={data} crosspost />
    </IconsContext.Provider>
  );
};

export default CrosspostWrapper;
