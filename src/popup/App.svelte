<script lang="ts">
  import { onMount } from "svelte";
  import GoogleDriveConnect from "./components/GoogleDriveConnect.svelte";
  import Header from "./components/Header.svelte";
  import { isConnected, checkConnection } from "./store/connection.ts";
  import Tabs from "./components/Tabs.svelte";

  // Initialize store
  onMount(checkConnection);
</script>

<div class="app-container">
  <Header />
  <div class="content">
    {#if !$isConnected}
      <GoogleDriveConnect />
    {:else}
      <Tabs />
    {/if}
  </div>
</div>

<style>
  .app-container {
    width: 450px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content {
    width: 100%;
    height: 100%;
  }
</style>
