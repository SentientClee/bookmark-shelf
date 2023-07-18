<script>
  import GoSync from "svelte-icons/go/GoSync.svelte";
  import MdSettings from "svelte-icons/md/MdSettings.svelte";
  import FaBookmark from "svelte-icons/fa/FaBookmark.svelte";
  import { writable } from "svelte/store";

  // Writable store to keep track of the active tab
  let activeTab = writable("home");
</script>

<div class="container">
  <!-- Tab Contents -->
  {#if $activeTab === "home"}
    <div class="tab-content">
      <h1>Home Tab</h1>
      <p>Welcome to the home tab.</p>
    </div>
  {:else if $activeTab === "profile"}
    <div class="tab-content">
      <h1>Profile Tab</h1>
      <p>Welcome to the profile tab.</p>
    </div>
  {:else if $activeTab === "settings"}
    <div class="tab-content">
      <h1>Settings Tab</h1>
      <p>Welcome to the settings tab.</p>
    </div>
  {/if}

  <!-- Tab Buttons -->
  <div class="tabs">
    <button
      class="tab-button"
      on:click={() => ($activeTab = "home")}
      class:active={$activeTab === "home"}
    >
      <FaBookmark />
    </button>

    <button
      class="tab-button"
      on:click={() => ($activeTab = "profile")}
      class:active={$activeTab === "profile"}
    >
      <GoSync />
    </button>

    <button
      class="tab-button"
      on:click={() => ($activeTab = "settings")}
      class:active={$activeTab === "settings"}
    >
      <MdSettings />
    </button>
  </div>
</div>

<!-- Style -->
<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tabs {
    border-top: 1px solid #5c5470;
    display: flex;
    height: 48px;
  }

  .tab-button {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background: #2a2438;
    transition: none;
  }
  .tab-button:hover {
    border-left-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-top: 1px solid #646cff;
  }
  .tab-button:focus,
  .tab-button:focus-visible {
    outline: none;
    border-left-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-top: 2px solid #646cff;
  }

  .tab-button.active {
    border-top: 2px solid #646cff;
    background: #352f44;
    color: white;
  }

  .tab-content {
    margin-top: 10px;
    flex: 1;
  }
</style>
