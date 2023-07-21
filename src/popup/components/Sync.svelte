<script lang="ts">
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";
  import { selectedBackup } from "../store/backups";

  async function syncToBackup() {
    await browser.runtime.sendMessage({
      type: "sync_to_backup",
      fileId: $selectedBackup.id,
    });
  }

  async function syncToBrowser() {
    await browser.runtime.sendMessage({
      type: "sync_to_browser",
      fileId: $selectedBackup.id,
    });
  }
</script>

<div class="container">
  <button disabled={!$selectedBackup} on:click={syncToBackup}>
    <span>Sync to Backup</span>
    <div class="icon"><FaGoogleDrive /></div>
  </button>

  <button disabled={!$selectedBackup} on:click={syncToBrowser}>
    <span>Sync to Browser</span>
    <div class="icon"><FaGoogleDrive /></div>
  </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 100%;
    width: 100%;
  }

  button {
    border-radius: 8px;
  }

  button > .icon {
    color: white;
    width: 32px;
    height: 32px;
  }
</style>
