import { writable } from "svelte/store";

export const isConnected = writable(false);

export const checkConnection = async () => {
  const res = await browser.runtime.sendMessage({ type: "is_connected" });
  isConnected.set(res);
};
