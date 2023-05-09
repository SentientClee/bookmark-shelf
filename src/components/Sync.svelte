<script lang="ts">
  const sync = () => {
    console.log("Syncing...");
  };
</script>

<button on:click={sync}> Sync to Server </button>
