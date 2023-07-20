import type { BackupFile } from "../../types";
import GoogleAuthProvider from "../auth/GoogleOAuthProvider";

export default class GoogleDrive {
  private authProvider: GoogleAuthProvider;

  constructor({ authProvider }) {
    this.authProvider = authProvider;
  }

  async getFiles(): Promise<BackupFile[]> {
    const token = await this.authProvider.getAuthToken();
    if (!token) {
      throw new Error("No access token provided");
    }

    const request = new Request("https://www.googleapis.com/drive/v3/files", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    });

    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data.files;
    } catch (err) {
      console.error(err);
    }
  }

  async createFile(fileName: string, fileContent: Object) {
    const token = await this.authProvider.getAuthToken();
    if (!token) {
      throw new Error("No access token provided");
    }

    const data = new FormData();
    data.append(
      "metadata",
      new Blob(
        [JSON.stringify({ name: fileName, mimeType: "application/json" })],
        {
          type: "application/json",
        }
      )
    );
    data.append("file", JSON.stringify(fileContent));

    const request = new Request(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + token }),
        body: data,
      }
    );

    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateFie(fileId: string, fileContent: Object) {
    const token = await this.authProvider.getAuthToken();
    if (!token) {
      throw new Error("No access token provided");
    }

    const data = new FormData();
    data.append(
      "metadata",
      new Blob([JSON.stringify({ name, mimeType: "application/json" })], {
        type: "application/json",
      })
    );
    data.append("file", JSON.stringify(fileContent));

    const request = new Request(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`,
      {
        method: "PATCH",
        headers: new Headers({ Authorization: "Bearer " + token }),
        body: data,
      }
    );

    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getFile(fileId: string) {
    if (!fileId) {
      throw new Error("File not created yet");
    }

    const token = await this.authProvider.getAuthToken();
    if (!token) {
      throw new Error("No access token provided");
    }

    const request = new Request(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      }
    );

    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFile(fileId: string) {
    if (!fileId) {
      throw new Error("Missing fileId to delete");
    }

    const token = await this.authProvider.getAuthToken();
    if (!token) {
      throw new Error("No access token provided");
    }

    const request = new Request(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        method: "DELETE",
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      }
    );

    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
