class OAuthProvider {
  clientId;
  redirectUri;
  scope;
  authEndpoint;
  storageKey; // key where specific auth tokens are stored
  constructor(clientId, redirectUri, scope, authEndpoint, storageKey) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scope = scope;
    this.authEndpoint = authEndpoint;
    this.storageKey = storageKey;
  }
  async getAuthToken() {
    const storageKeyData = await browser.storage.local.get(this.storageKey);
    const storedTokenData = storageKeyData[this.storageKey];
    // Return token from storage if it's not expired
    if (
      storedTokenData &&
      storedTokenData.token &&
      new Date().getTime() < storedTokenData.expiry
    ) {
      return storedTokenData.token;
    }
    const newTokenData = await this.triggerAuthTokenFlow();
    // Update the copy in storage.local
    await browser.storage.local.set({ [this.storageKey]: newTokenData });
    return newTokenData.token;
  }
  async triggerAuthTokenFlow() {
    const authUrl = new URL(this.authEndpoint);
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: "token",
      redirect_uri: this.redirectUri,
      scope: this.scope,
    });
    authUrl.search = params.toString();
    const responseUrl = await browser.identity.launchWebAuthFlow({
      interactive: true,
      url: authUrl.toString(),
    });
    return this.parseResponseUrl(responseUrl);
  }
  // Default parsing logic, can be overridden in derived classes
  parseResponseUrl(responseUrl) {
    const paramsFromResponse = new URL(responseUrl).hash
      .substring(1)
      .split("&");
    const token = paramsFromResponse
      .find((param) => param.startsWith("access_token"))
      .split("=")[1];
    const expiresIn = paramsFromResponse
      .find((param) => param.startsWith("expires_in"))
      .split("=")[1];
    return {
      token,
      expiry: new Date().getTime() + Number(expiresIn) * 1000,
    };
  }
}

class GoogleAuthProvider extends OAuthProvider {
  constructor() {
    // TODO: Delete this code when getRedirectURL returns a stable URL.
    const redirectURL = browser.identity.getRedirectURL();
    console.log("redirectURL:", redirectURL);
    super(
      "821773579760-mjff1535p57m1bcvodnmmeb5edep0436.apps.googleusercontent.com",
      redirectURL,
      "https://www.googleapis.com/auth/drive.file",
      "https://accounts.google.com/o/oauth2/auth",
      "google"
    );
  }
}

class GoogleDrive {
  authProvider;
  fileId;
  headers;
  constructor() {
    this.authProvider = new GoogleAuthProvider();
    this.headers = new Headers();
    this.fileId = null;
  }
  async createFile(fileContent) {
    const token = await this.authProvider.getAuthToken();
    if (!token) {
      throw new Error("No access token provided");
    }
    let url =
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=media";
    this.headers.append("Authorization", "Bearer " + token);
    this.headers.append("Content-Type", "application/json");
    let request = new Request(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(fileContent),
    });
    try {
      let response = await fetch(request);
      let data = await response.json();
      // Update the file's metadata to set the file name
      this.fileId = data.id;
      url = "https://www.googleapis.com/drive/v3/files/" + this.fileId;
      let metadata = {
        name: "bookmarks.json",
      };
      this.headers.set("Content-Type", "application/json");
      request = new Request(url, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(metadata),
      });
      response = await fetch(request);
      data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  async getFile() {
    if (!this.fileId) {
      throw new Error("File not created yet");
    }
    let url =
      "https://www.googleapis.com/drive/v3/files/" + this.fileId + "?alt=media";
    let request = new Request(url, {
      method: "GET",
      headers: this.headers,
    });
    try {
      let response = await fetch(request);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}

browser.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "connect_to_google_drive") {
    const gDrive = new GoogleDrive();
    // Get bookmarks and store them all as a json file in Google Drive
    gDrive.createFile({ womp: "diggity" });
    sendResponse();
  }
});
//# sourceMappingURL=background.js.map
