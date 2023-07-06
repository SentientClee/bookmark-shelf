<script lang="ts">
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";
  import { SyncLoader } from "svelte-loading-spinners";
  import {
    fetchBackupFiles,
    createBackupFile,
    backupFiles,
  } from "../store/backups";
  import { onMount } from "svelte";

  onMount(fetchBackupFiles);

  let filename: string;
  let isLoading: boolean;
</script>

<div class="container">
  <h3>Sync Settings</h3>

  <div class="input">
    <input bind:value={filename} placeholder="Enter filename..." />
    <button
      on:click={() => {
        isLoading = true;
        createBackupFile(filename);
      }}
      disabled={isLoading}
    >
      <span>Create backup file</span>
    </button>
    {#if isLoading}
      <div class="spinner">
        <SyncLoader size="30" color="#dbd8e3" unit="px" />
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    width: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
  }

  .spinner {
    margin: auto;
  }

  .input {
    width: 100%;
    display: flex;
    gap: 2px;
  }

  input {
    border: 1px solid transparent;
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
