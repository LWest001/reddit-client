import { getSettings } from "./getSettings";

export function setSetting(property, value) {
  localStorage.setItem(
    "rlite-settings",
    JSON.stringify({
      ...getSettings(),
      [property]: value,
    })
  );
}
