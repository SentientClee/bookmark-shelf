import GoogleAuthProvider from "./auth/GoogleOAuthProvider";
import GoogleDrive from "./storage/GoogleDrive";

const authProvider = new GoogleAuthProvider();
const gDrive = new GoogleDrive({ authProvider });

browser.runtime.onMessage.addListener(
  (request, _, sendResponse: (obj: any) => void) => {
    if (request.type === "is_connected") {
      authProvider.isTokenValid().then(sendResponse);
    }

    if (request.type === "connect_to_google_drive") {
      // Trigger fetching an auth token if we are not 'connected'
      authProvider.getAuthToken().then(() => {
        sendResponse(true);
      });
    }

    if (request.type === "fetch_backup_files") {
      gDrive.getFiles().then(sendResponse);
    }

    if (request.type === "create_backup_file") {
      gDrive.createFile(request.name, {}).then(sendResponse);
    }

    if (request.type === "delete_backup_file") {
      gDrive.deleteFile(request.id).then(sendResponse);
    }

    if (request.type === "sync_to_backup") {
      browser.bookmarks
        .getTree()
        .then((bookmarksTree) => {
          return gDrive.updateFie(request.id, bookmarksTree);
        })
        .then(sendResponse);
    }

    if (request.type === "sync_to_browser") {
      gDrive.getFile(request.id).then((bookmarksTree) => {
        console.log("LOADED DATA FROM GDRIVE", bookmarksTree);
      });
    }

    // Return 'true' to make 'sendResponse' available to awaited async calls
    return true;
  }
);
