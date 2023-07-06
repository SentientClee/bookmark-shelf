<script lang="ts">
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";
  import {
    fetchBackupFiles,
    createBackupFile,
    backupFiles,
  } from "../store/backups";
  import { onMount } from "svelte";

  onMount(fetchBackupFiles);
</script>

<div class="container">
  <div class="list" />

  <input placeholder="Backup file name..." />
  <button
    on:click={() => {
      createBackupFile("bookmarks.json");
    }}
  >
    <span>Create backup</span>
  </button>
</div>

<style>
  .container {
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  button {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button > .icon {
    color: white;
    width: 32px;
    height: 32px;
  }
</style>
