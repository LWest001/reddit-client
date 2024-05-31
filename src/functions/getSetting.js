import { getSettings } from "./getSettings";

export function getSetting(property) {
  return String(getSettings()?.[property]);
}
