<script lang="ts">
  const sync = async () => {
    console.log("Syncing...");
    console.log(window.location);
    console.log("chrome", chrome);
    const tree = await chrome.bookmarks.getTree();
    console.log("tree", tree);
  };
</script>

<button on:click={sync}> Sync to Server </button>
