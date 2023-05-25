type TokenData = {
  token: string;
  expiry: number;
};

export class TokenManager {
  tokenData: TokenData;
  redirectUri: string;
  clientId: string;
  scope: string;

  constructor() {
    this.tokenData = {
      token: null,
      expiry: null,
    };
    this.redirectUri = browser.identity.getRedirectURL();
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    this.scope = "https://www.googleapis.com/auth/drive.file";

    // Load token data from storage.local into memory when the TokenManager is instantiated.
    this.initTokenData();
  }

  async initTokenData() {
    const storedTokenData = await browser.storage.local.get([
      "token",
      "expiry",
    ]);
    this.tokenData = storedTokenData as TokenData;
  }

  async getAuthToken() {
    if (this.tokenData.token && new Date().getTime() < this.tokenData.expiry) {
      return this.tokenData.token;
    }

    const authUrl = new URL("https://accounts.google.com/o/oauth2/auth");
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

    const paramsFromResponse = new URL(responseUrl).hash
      .substring(1)
      .split("&");
    const token = paramsFromResponse
      .find((param) => param.startsWith("access_token"))
      .split("=")[1];
    const expiresIn = paramsFromResponse
      .find((param) => param.startsWith("expires_in"))
      .split("=")[1];

    this.tokenData.token = token;
    this.tokenData.expiry = new Date().getTime() + Number(expiresIn) * 1000;

    // Update the copy in storage.local
    await browser.storage.local.set(this.tokenData);

    return token;
  }
}
