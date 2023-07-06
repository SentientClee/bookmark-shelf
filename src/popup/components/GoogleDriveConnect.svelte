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
    outline: 4px auto -webkit-focus-ring-color;
  }

  button > .icon {
    color: white;
    width: 32px;
    height: 32px;
  }
</style>
