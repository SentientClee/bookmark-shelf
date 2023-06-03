interface TokenData {
  token: string | null;
  expiry: number | null;
}

export default abstract class OAuthProvider {
  protected clientId: string;
  protected redirectUri: string;
  protected scope: string;
  protected authEndpoint: string;
  protected storageKey: string; // key where specific auth tokens are stored

  constructor(
    clientId: string,
    redirectUri: string,
    scope: string,
    authEndpoint: string,
    storageKey: string
  ) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scope = scope;
    this.authEndpoint = authEndpoint;
    this.storageKey = storageKey;
  }

  async getAuthToken(): Promise<string | null> {
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

  protected async triggerAuthTokenFlow(): Promise<TokenData> {
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
  protected parseResponseUrl(responseUrl: string): TokenData {
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
