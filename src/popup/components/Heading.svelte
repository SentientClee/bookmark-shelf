<script lang="ts">
  import GiBookmark from "svelte-icons/gi/GiBookmark.svelte";
</script>

<div class="container">
  <div class="icon"><GiBookmark /></div>
  <h2>Bookmark Shelf</h2>
</div>

<style>
  .container {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .icon {
    color: white;
    width: 32px;
    height: 32px;
  }
</style>
