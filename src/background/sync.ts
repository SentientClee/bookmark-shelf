import type GoogleDrive from "./storage/GoogleDrive";

export default class Sync {
  private gDrive: GoogleDrive;

  constructor({ gDrive }) {
    this.gDrive = gDrive;
  }

  async syncToBrowser(fileId: string) {
    const bookmarksTreeFromFile = await this.gDrive.getFile(fileId);
    const bookmarksTreeFromBrowser = await browser.bookmarks.getTree();
    console.log("LOADED DATA FROM GDRIVE", bookmarksTreeFromFile);

    // Generate list of all bookmarks to create
    // First delete bookmarks that aren't present in `bookmarksTreeFromFile`
    // Second create all bookmarks that aren't present in browser
  }

  async syncToBackup(fileId: string) {
    const bookmarksTree = await browser.bookmarks.getTree();
    await this.gDrive.updateFie(fileId, bookmarksTree);
  }
}
