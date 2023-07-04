import { writable } from "svelte/store";
import type { BackupFile } from "../../types";

export const backupFiles = writable<BackupFile[]>();
