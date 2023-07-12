import { get, writable } from "svelte/store";
import type { BackupFile } from "../../types";

export const backupFiles = writable<BackupFile[]>();

function createExtensionStorageStore(key: string, startValue: any) {
  const { subscribe, set, update } = writable(startValue);

  // Fetch initial value from extension storage
  browser.storage.local.get(key).then((result: any) => {
    set(result[key] || startValue);
  });

  return {
    subscribe,
    set: (value: any) => {
      browser.storage.local.set({ [key]: value }).then(() => {
        set(value);
      });
    },
    update,
  };
}

export const selectedBackup = createExtensionStorageStore("backup", undefined);

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
