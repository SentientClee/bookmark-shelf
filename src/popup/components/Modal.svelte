<!-- TODO: Add lang="ts" and fix errors -->
<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  export let show = false;
  const dispatch = createEventDispatcher();

  let modal;
  let previouslyFocusedElement;
  let focusableElements;

  onMount(() => {
    document.addEventListener("focusin", trapFocus);
  });

  onDestroy(() => {
    document.removeEventListener("focusin", trapFocus);
  });

  function close() {
    dispatch("close");
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  }

  function trapFocus(event) {
    if (!show) return;
    if (!modal.contains(event.target)) {
      event.stopPropagation();
      focusableElements[0].focus();
    }
  }

  $: if (show && modal) {
    previouslyFocusedElement = document.activeElement;
    focusableElements = Array.from(
      modal.querySelectorAll(
        "a, button, input, textarea, select, details,[tabindex]:not([tabindex='-1'])"
      )
    ).filter((el) => !el.hasAttribute("disabled"));
    focusableElements[0].focus();
  }
</script>

<div bind:this={modal} class="modal" class:visible={show}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-background" on:click={close} />
  <div class="modal-content">
    <slot />
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0.3s, opacity 0.3s;
  }

  .modal.visible {
    opacity: 1;
    visibility: visible;
  }

  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background: #2a2438;
    padding: 1em;
    max-width: 80vw;
    position: relative;
    z-index: 1;
  }
</style>
