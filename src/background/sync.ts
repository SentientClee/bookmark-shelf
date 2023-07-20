import type GoogleDrive from "./storage/GoogleDrive";

export default class Sync {
  private gDrive: GoogleDrive;

  constructor({ gDrive }) {
    this.gDrive = gDrive;
  }

  async syncToBrowser(fileId: string) {
    const bookmarksTree = await this.gDrive.getFile(fileId);
    console.log("LOADED DATA FROM GDRIVE", bookmarksTree);
  }

  async syncToBackup(fileId: string) {
    const bookmarksTree = await browser.bookmarks.getTree();
    await this.gDrive.updateFie(fileId, bookmarksTree);
  }
}
