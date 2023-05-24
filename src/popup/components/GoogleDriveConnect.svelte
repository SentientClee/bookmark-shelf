<script lang="ts">
  const connect = async () => {
    browser.runtime.sendMessage({ type: "connect_to_google_drive" });
  };
</script>

<!-- TODO: Explainer on why connecting to Google Drive is required. -->
<button on:click={connect}>Connect to Google Drive</button>
