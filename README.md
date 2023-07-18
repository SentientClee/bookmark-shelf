# Bookmark Shelf

This is a cross browser extension for managing bookmarks and backing them up to Google Drive (other storage to be added in the future). It is written in Svelte and TypeScript. It does not require signing up for any service or backend. The user can just authenticate with the storage system of their choice and backup their files there. They have full control over those files and this extension merely asks permission to create and utilize the files it creates.

### Supported Browsers

- Firefox
- Chrome

### Supported Storage Backends

- Google Drive

## TODO

- Build out bookmarks UI
  - List out bookmarks
  - Search bookmarks
  - Add bookmarks
  - Delete bookmarks
  - Edit bookmarks? (Not sure what editable items there would be)
- Build out sync actions UI
  - Sync bookmarks to backup
  - Sync backup to bookmarks
  - Merge backup and bookmarks
  - Should these be separate actions or should we just have 1 merge action?
  - Automatic syncing based on bookmark events?
