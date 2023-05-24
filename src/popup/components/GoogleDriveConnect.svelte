<script lang="ts">
  const api = typeof browser !== undefined ? browser : chrome;

  async function getAuthToken() {
    const redirectUri = api.identity.getRedirectURL();
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

    const responseUrl = await api.identity.launchWebAuthFlow({
      // TODO: Possibly use setting this to `false` to test out if they can be automatically signed in for the life of the token
      interactive: true,
      url: authUrl.toString(),
    });

    const paramsFromResponse = new URL(responseUrl).hash.split("&");
    const token = paramsFromResponse
      .find((param) => param.startsWith("access_token"))
      .split("=")[1];

    console.log("redirectUri", redirectUri);
    console.log("token", token);
    return token;
  }

  const connect = async () => {
    // Use this token to make Google Drive API requests.
    const token = await getAuthToken();
    console.log(token);
  };
</script>

<!-- TODO: Explainer on why connecting to Google Drive is required. -->
<button on:click={connect}>Connect to Google Drive</button>
