# Bookmark Shelf

This is a cross browser extension for managing bookmarks and backing them up to Google Drive (other storage to be added in the future). It is written in Svelte and TypeScript. It does not require signing up for any service or backend. The user can just authenticate with the storage system of their choice and backup their files there. They have full control over those files and this extension merely asks permission to create and utilize the files it creates.

### Supported Browsers

- Firefox
- Chrome

### Supported Storage Backends

- Google Drive

## TODO

- Build out bookmarks UI (for backups)
  - List backup file bookmarks
  - Search backup file bookmarks
  - Add backup file bookmarks
  - Delete backup file bookmarks
  - Edit bookmarks? (Not sure what editable items there would be)
- Build out sync actions UI
  - Sync browser bookmarks to backup
  - Sync backup bookmarks to browser
  - Merge backup and browser bookmarks
  - Automatic syncing based on bookmark events?
