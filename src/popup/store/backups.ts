import { get, writable } from "svelte/store";
import type { BackupFile } from "../../types";

export const backupFiles = writable<BackupFile[]>();

function createExtensionStorageStore<T>(key: string, startValue: T) {
  const { subscribe, set, update } = writable(startValue);

  // Fetch initial value from extension storage
  browser.storage.local.get(key).then((result: { [key: string]: T }) => {
    set(result[key] || startValue);
  });

  return {
    subscribe,
    set: (value: T) => {
      browser.storage.local.set({ [key]: value }).then(() => {
        set(value);
      });
    },
    update,
  };
}

export const selectedBackup = createExtensionStorageStore<BackupFile>(
  "backup",
  undefined
);

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
