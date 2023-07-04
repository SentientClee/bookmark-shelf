<script lang="ts">
  import FaGoogleDrive from "svelte-icons/fa/FaGoogleDrive.svelte";

  const fetchBackupFiles = async () => {
    console.log("CALLED POPUP");
    const res = await browser.runtime.sendMessage({
      type: "fetch_backup_files",
    });
  };

  const createBackupFile = async () => {
    const res = await browser.runtime.sendMessage({
      type: "create_backup_file",
    });
  };
</script>

<div class="container">
  <button on:click={fetchBackupFiles}>
    <span>Fetch files</span>
    <div class="icon"><FaGoogleDrive /></div>
  </button>
  <input placeholder="Backup file name..." />
  <button on:click={createBackupFile}>
    <span>Create backup file</span>
    <div class="icon"><FaGoogleDrive /></div>
  </button>
</div>

<style>
  .container {
  }

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
