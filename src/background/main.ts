async function getAuthToken() {
  const redirectUri = browser.identity.getRedirectURL();
  console.log("redirectUri", redirectUri);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const scope = "https://www.googleapis.com/auth/drive.file";

  const authUrl = new URL("https://accounts.google.com/o/oauth2/auth");
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "token",
    redirect_uri: redirectUri,
    scope: scope,
  });

  authUrl.search = params.toString();

  console.log("launching auth flow");
  const responseUrl = await browser.identity.launchWebAuthFlow({
    // TODO: Possibly use setting this to `false` to test out if they can be automatically signed in for the life of the token
    interactive: true,
    url: authUrl.toString(),
  });

  console.log("responseUrl", responseUrl);
  const paramsFromResponse = new URL(responseUrl).hash.substring(1).split("&");
  const token = paramsFromResponse
    .find((param) => param.startsWith("access_token"))
    .split("=")[1];

  console.log("token", token);
  return token;
}

browser.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === "connect_to_google_drive") {
    getAuthToken();
    sendResponse();
  }
});
