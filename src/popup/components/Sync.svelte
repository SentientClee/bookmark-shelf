<script lang="ts">
  import FaFile from "svelte-icons/fa/FaFile.svelte";
  import { SyncLoader } from "svelte-loading-spinners";
  import {
    fetchBackupFiles,
    createBackupFile,
    backupFiles,
  } from "../store/backups";
  import { onMount } from "svelte";

  let filename: string;
  let isLoadingCreate: boolean;
  let isLoadingFiles: boolean;

  let backupHeaderText = "Backup files";
  $: if ($backupFiles) {
    backupHeaderText = `Backup files (${$backupFiles.length})`;
  }

  onMount(async () => {
    isLoadingFiles = true;
    await fetchBackupFiles();
    isLoadingFiles = false;
  });
</script>

<div class="container">
  <h3>Current backup</h3>
  <div class="backup-files-header">
    <h3>{backupHeaderText}</h3>
    {#if isLoadingCreate}
      <div>
        <SyncLoader size="30" color="#dbd8e3" unit="px" />
      </div>
    {/if}
  </div>

  <div class="backup-files">
    {#if isLoadingFiles}
      <div>
        <SyncLoader size="50" color="#dbd8e3" unit="px" />
      </div>
    {:else if $backupFiles !== undefined}
      <div class="list">
        {#each $backupFiles as file}
          <div class="file">
            <div class="icon"><FaFile /></div>
            {file.name}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <h3>Create new backup file</h3>
  <div class="input">
    <input bind:value={filename} placeholder="Enter filename..." />
    <button
      on:click={async () => {
        isLoadingCreate = true;
        await createBackupFile(filename);
        await fetchBackupFiles();
        isLoadingCreate = false;
        filename = "";
      }}
      disabled={isLoadingCreate}
    >
      <span>Create</span>
    </button>
  </div>
</div>

<style>
  .container {
    width: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
  }

  .backup-files {
    margin-bottom: 1rem;
    overflow-y: scroll;
    max-height: 220px;
  }

  .backup-files-header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: scroll;
    padding-right: 12px;
  }

  .file {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 8px;
    border: 1px solid #5c5470;
    border-radius: 12px;
    cursor: pointer;
  }

  .file:hover {
    border: 1px solid white;
  }

  .icon {
    color: white;
    width: 16px;
    height: 16px;
  }

  .input {
    width: 100%;
    display: flex;
    gap: 2px;
  }

  input {
    border: 1px solid transparent;
    flex-grow: 1;
  }
  input:hover {
    border-color: #646cff;
  }
  input:focus,
  input:focus-visible {
    outline: 2px solid #646cff;
  }

  button {
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 2px solid #646cff;
  }
</style>
