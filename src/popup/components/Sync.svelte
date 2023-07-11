<script lang="ts">
  import FaFile from "svelte-icons/fa/FaFile.svelte";
  import FaTrash from "svelte-icons/fa/FaTrash.svelte";
  import { RingLoader } from "svelte-loading-spinners";
  import {
    fetchBackupFiles,
    createBackupFile,
    deleteBackupFile,
    backupFiles,
  } from "../store/backups";
  import { onMount } from "svelte";
  import Modal from "./Modal.svelte";
  import type { BackupFile } from "../../types";

  let filename: string;
  let toDelete: BackupFile;
  let isLoadingFiles: boolean;
  let showModal: boolean;

  let backupHeaderText = "Backup files";
  $: if ($backupFiles) {
    backupHeaderText = `Backup files (${$backupFiles.length})`;
  }

  function closeModal() {
    showModal = false;
  }

  async function deleteFile() {
    isLoadingFiles = true;
    closeModal();
    await deleteBackupFile(toDelete.id);
    isLoadingFiles = false;
  }

  onMount(async () => {
    isLoadingFiles = true;
    await fetchBackupFiles();
    isLoadingFiles = false;
  });
</script>

<div class="container">
  <h3>Current backup</h3>
  <h3>{backupHeaderText}</h3>

  <div class="backup-files">
    {#if isLoadingFiles}
      <div class="loader">
        <RingLoader size="100" color="#dbd8e3" unit="px" />
      </div>
    {:else if $backupFiles !== undefined}
      <div class="list">
        {#each $backupFiles as file}
          <div class="file">
            <div class="filename">
              <div class="icon"><FaFile /></div>
              {file.name}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:click={() => {
                showModal = true;
                toDelete = file;
              }}
              class="icon"
            >
              <FaTrash />
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <h3>Create new backup file</h3>
  <div class="input">
    <input bind:value={filename} placeholder="Enter filename..." />
    <button
      class="btn-primary"
      on:click={async () => {
        isLoadingFiles = true;
        await createBackupFile(filename);
        await fetchBackupFiles();
        isLoadingFiles = false;
        filename = "";
      }}
      disabled={isLoadingFiles}
    >
      <span>Create</span>
    </button>
  </div>
</div>

<Modal show={showModal} on:close={closeModal}>
  <h4>Are you sure you want to delete backup file "{toDelete?.name}"?</h4>
  <div class="file-delete-actions">
    <button class="btn-secondary" on:click={closeModal}>Cancel</button>
    <button class="btn-primary" on:click={deleteFile}>Delete</button>
  </div>
</Modal>

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
    height: 220px;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    justify-content: space-between;
    padding: 16px;
    border: 1px solid #5c5470;
    border-radius: 12px;
    cursor: pointer;
  }

  .filename {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .file:hover {
    border: 1px solid white;
  }

  .file-delete-actions {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
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
</style>
