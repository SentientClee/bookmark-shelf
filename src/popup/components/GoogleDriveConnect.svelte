<script lang="ts">
  import { isConnected } from "../store/connection.ts";
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";

  const connect = async () => {
    const res = await browser.runtime.sendMessage({
      type: "connect_to_google_drive",
    });
    isConnected.set(res);
  };
</script>

<div class="container">
  <button on:click={connect}>
    <span>Connect to Google Drive</span>
    <div class="icon"><FaGoogleDrive /></div>
  </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  button {
    border-radius: 8px;
  }
</style>
