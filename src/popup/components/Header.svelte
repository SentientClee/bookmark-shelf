<script lang="ts">
  import GiBookmark from "svelte-icons/gi/GiBookmark.svelte";
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";
  import GoSync from "svelte-icons/go/GoSync.svelte";
  import { isConnected } from "../store/connection.ts";
  import { selectedBackup } from "../store/backups.ts";
</script>

<div class="container third-color">
  <div class="heading">
    <div class="icon"><GiBookmark /></div>
    <h3>Bookmark Shelf</h3>
  </div>

  <div class="status">
    <div class="connection">
      <div class="status-icon" class:connected={$isConnected}>
        <FaGoogleDrive />
      </div>
      <p>{$isConnected ? "Connected" : "Disconnected"}</p>
    </div>
    <div class="connection">
      <div class="status-icon" class:connected={$selectedBackup}>
        <GoSync />
      </div>
      <p>{$selectedBackup?.name || "None"}</p>
    </div>
  </div>
</div>

<style>
  .container {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  h3 {
    margin: 0;
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .icon {
    color: white;
    width: 24px;
    height: 24px;
  }

  p {
    margin: 0;
  }

  .status {
    display: flex;
    gap: 1rem;
  }

  .connection {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .status-icon {
    width: 16px;
    height: 16px;
  }

  .connected {
    color: #6f9b59;
  }
</style>
