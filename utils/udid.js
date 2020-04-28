import Cookies from "js-cookie";

import { COOKIE_KEY } from "./constants";

export function getUUID() {
  const uuid = Cookies.get(COOKIE_KEY);
  if (uuid) return uuid;
  const newUuid = createUUID();
  Cookies.set(COOKIE_KEY, newUuid);
  return newUuid;
}

function createUUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
