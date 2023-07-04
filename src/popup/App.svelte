<script lang="ts">
  import { onMount } from "svelte";
  import GoogleDriveConnect from "./components/GoogleDriveConnect.svelte";
  import Header from "./components/Header.svelte";
  import { checkConnection } from "./store/connection.ts";

  // Initialize store
  onMount(checkConnection);
</script>

<div class="app-container">
  <Header />
  <div class="content">
    <GoogleDriveConnect />
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
    flex-grow: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
