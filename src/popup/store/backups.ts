import { writable } from "svelte/store";
import type { BackupFile } from "../../types";

export const backupFiles = writable<BackupFile[]>();

export const fetchBackupFiles = async () => {
  const res = await browser.runtime.sendMessage({
    type: "fetch_backup_files",
  });
};

export const createBackupFile = async (name: string) => {
  const res = await browser.runtime.sendMessage({
    type: "create_backup_file",
    name,
  });
};
