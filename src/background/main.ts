import { TokenManager } from "./AuthToken";

const tokenManager = new TokenManager();

browser.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "connect_to_google_drive") {
    const token = await tokenManager.getAuthToken();

    // Get bookmarks and store them all as a json file in Google Drive
    sendResponse();
  }
});
