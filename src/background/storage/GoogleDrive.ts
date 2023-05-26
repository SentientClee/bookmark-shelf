import GoogleAuthProvider from "../auth/GoogleOAuthProvider";

export default class GoogleDrive {
  private authProvider: GoogleAuthProvider;
  private fileId: string;
  private headers: Headers;

  constructor() {
    this.authProvider = new GoogleAuthProvider();
    this.headers = new Headers();
    this.fileId = null;
  }

  async createFile(fileContent: object): Promise<any> {
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
