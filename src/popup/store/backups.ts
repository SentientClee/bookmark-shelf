import { get, writable } from "svelte/store";
import type { BackupFile } from "../../types";

export const backupFiles = writable<BackupFile[]>();
export const selectedBackup = writable<BackupFile>();

export const fetchBackupFiles = async () => {
  const res = await browser.runtime.sendMessage({
    type: "fetch_backup_files",
  });
  backupFiles.set(res);
};

export const createBackupFile = async (name: string) => {
  await browser.runtime.sendMessage({
    type: "create_backup_file",
    name,
  });
};

export const deleteBackupFile = async (id: string) => {
  await browser.runtime.sendMessage({
    type: "delete_backup_file",
    id,
  });
  const currBackupFiles = get(backupFiles);
  backupFiles.set(currBackupFiles.filter((file) => file.id !== id));
};
