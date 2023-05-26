import GoogleDrive from "./storage/GoogleDrive";

browser.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "connect_to_google_drive") {
    const gDrive = new GoogleDrive();

    // Get bookmarks and store them all as a json file in Google Drive
    gDrive.createFile({ womp: "diggity" });

    sendResponse();
  }
});
