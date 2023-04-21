<script lang="ts">
  export let alertText: string = "";
  export let doubleAlertText: string = "";
  alert("womp diggity");
  const customAlert = () => {
    alert(alertText);
    alert(doubleAlertText);
  };
</script>

<button on:click={customAlert}> Show me </button>
