<script lang="ts">
  import { onMount } from "svelte";
  import GoogleDriveConnect from "./components/GoogleDriveConnect.svelte";
  import Header from "./components/Header.svelte";
  import { checkConnection } from "./store/connection.ts";

  // Initialize store
  onMount(checkConnection);
</script>

<Header />
<div class="container">
  <GoogleDriveConnect />
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
</style>
