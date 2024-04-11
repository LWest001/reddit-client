import { useContext } from "react";

import { HeaderHeight } from "../components/Layout";

export function useMargin() {
  const headerHeight = useContext(HeaderHeight);

  return `calc(${headerHeight}px + 0.5rem)`;
}
