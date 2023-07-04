import GoogleAuthProvider from "./auth/GoogleOAuthProvider";
import GoogleDrive from "./storage/GoogleDrive";

const authProvider = new GoogleAuthProvider();
const gDrive = new GoogleDrive({ authProvider });

browser.runtime.onMessage.addListener(
  (request, _, sendResponse: (obj: any) => void) => {
    if (request.type === "is_connected") {
      authProvider.isTokenValid().then(sendResponse);

      return true;
    }

    if (request.type === "connect_to_google_drive") {
      // Trigger fetching an auth token if we are not 'connected'
      authProvider.getAuthToken().then(() => {
        sendResponse(true);
      });

      return true;
    }
  }
);
