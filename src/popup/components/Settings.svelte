<script lang="ts">
  import FaFile from "svelte-icons/fa/FaFile.svelte";
  import FaTrash from "svelte-icons/fa/FaTrash.svelte";
  import GoSync from "svelte-icons/go/GoSync.svelte";
  import GoPlus from "svelte-icons/go/GoPlus.svelte";
  import { RingLoader } from "svelte-loading-spinners";
  import {
    fetchBackupFiles,
    createBackupFile,
    deleteBackupFile,
    backupFiles,
    selectedBackup,
  } from "../store/backups";
  import { onMount } from "svelte";
  import Modal from "./Modal.svelte";
  import type { BackupFile } from "../../types";

  let filename: string;
  let toDelete: BackupFile;
  let isLoadingFiles: boolean;
  let showDeleteModal: boolean;
  let showCreateModal: boolean;

  let backupHeaderText = "Backup files";
  $: if ($backupFiles) {
    backupHeaderText = `Backup files (${$backupFiles.length})`;
  }

  function closeDeleteModal() {
    showDeleteModal = false;
  }

  function closeCreateModal() {
    showCreateModal = false;
  }

  async function deleteFile() {
    isLoadingFiles = true;
    closeDeleteModal();
    await deleteBackupFile(toDelete.id);
    isLoadingFiles = false;

    // Reset selected backup file
    if ($selectedBackup.id === toDelete.id) {
      $selectedBackup = undefined;
    }
  }

  async function createFile() {
    isLoadingFiles = true;
    closeCreateModal();
    await createBackupFile(filename);
    await fetchBackupFiles();
    isLoadingFiles = false;
    filename = "";
  }

  onMount(async () => {
    isLoadingFiles = true;
    await fetchBackupFiles();
    isLoadingFiles = false;
  });
</script>

<div class="container">
  <div class="backup-header">
    <h4>{backupHeaderText}</h4>
    <button on:click={() => (showCreateModal = true)} class="icon-button">
      <div class="create-icon">
        <GoPlus />
      </div>
    </button>
  </div>

  <div class="backup-files">
    {#if isLoadingFiles}
      <div class="loader">
        <RingLoader size="100" color="#dbd8e3" unit="px" />
      </div>
    {:else if $backupFiles !== undefined}
      <div class="list">
        {#each $backupFiles as file}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            on:click={() => {
              $selectedBackup = file;
            }}
            class="file"
          >
            <div class="filename">
              {#if $selectedBackup?.id === file.id}
                <div class="icon selected"><GoSync /></div>
              {:else}
                <div class="icon"><FaFile /></div>
              {/if}
              {file.name}
            </div>
            <button
              class="icon-button"
              on:click={(event) => {
                event.stopPropagation();
                showDeleteModal = true;
                toDelete = file;
              }}
            >
              <div class="icon">
                <FaTrash />
              </div>
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<!-- Create Modal -->
<Modal show={showCreateModal} on:close={closeCreateModal}>
  <div class="create-modal">
    <h4>New backup file</h4>
    <input bind:value={filename} placeholder="Enter filename..." />
    <div class="modal-actions">
      <button class="btn-secondary" on:click={closeCreateModal}>Cancel</button>
      <button class="btn-primary" on:click={createFile}>Create</button>
    </div>
  </div>
</Modal>

<!-- Delete Modal -->
<Modal show={showDeleteModal} on:close={closeDeleteModal}>
  <h4>Are you sure you want to delete backup file "{toDelete?.name}"?</h4>
  <div class="modal-actions">
    <button class="btn-secondary" on:click={closeDeleteModal}>Cancel</button>
    <button class="btn-primary" on:click={deleteFile}>Delete</button>
  </div>
</Modal>

<style>
  .container {
    width: 100%;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
  }

  .backup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .backup-files {
    margin-bottom: 1rem;
    overflow-y: scroll;
    scrollbar-width: thin;
    max-height: 350px;
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

  .create-modal {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 300px;
  }

  .create-modal > h4 {
    margin: 0;
  }

  .create-modal > input {
    height: 40px;
    width: 100%;
  }

  .modal-actions {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
  }

  .icon-button {
    padding: 6px;
    border-radius: 4px;
    background: inherit;
  }
  .icon-button:hover {
    background: #352f44;
    border-color: transparent;
  }

  .create-icon {
    color: white;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .icon {
    color: white;
    width: 16px;
    height: 16px;
  }

  .selected {
    color: #6f9b59;
  }
</style>
