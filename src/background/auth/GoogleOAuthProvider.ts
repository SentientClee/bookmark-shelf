export default class GoogleAuthProvider extends OAuthProvider {
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
