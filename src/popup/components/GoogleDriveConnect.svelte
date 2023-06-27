<script lang="ts">
  import { isConnected } from "../store/connection.ts";
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";

  const connect = async () => {
    browser.runtime.sendMessage({ type: "connect_to_google_drive" });
  };
</script>

{#if !$isConnected}
  <button on:click={connect}>
    <span>Connect to Google Drive</span>
    <div class="icon"><FaGoogleDrive /></div>
  </button>
{/if}

<style>
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
