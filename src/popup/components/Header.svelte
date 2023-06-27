<script lang="ts">
  import GiBookmark from "svelte-icons/gi/GiBookmark.svelte";
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";
  import { isConnected } from "../store/connection.ts";
</script>

<div class="container third-color">
  <div class="heading">
    <div class="icon"><GiBookmark /></div>
    <h2>Bookmark Shelf</h2>
  </div>

  <div class="status">
    <div class={$isConnected ? "status-icon connected" : "status-icon"}>
      <FaGoogleDrive />
    </div>
    {#if $isConnected}
      <p>Connected</p>
    {:else}
      <p>Disconnected</p>
    {/if}
  </div>
</div>

<style>
  .container {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .icon {
    color: white;
    width: 32px;
    height: 32px;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .status-icon {
    width: 24px;
    height: 24px;
  }

  .connected {
    color: green;
  }
</style>
