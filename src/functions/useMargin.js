import { useContext } from "react";

import { HeaderHeight } from "../components/Layout";

export function useMargin(cushion = 0) {
  const headerHeight = useContext(HeaderHeight);

  return `calc(${headerHeight}px + ${cushion}rem)`;
}
