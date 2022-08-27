<script lang="ts">
  export let spinnerClass = '';
  export let textClass = '';
</script>

<div class="h-full w-full flex flex-col items-center justify-center">
  <h1 class="text-2xl font-bold {textClass}">Loading...</h1>
  <i class="fa-solid fa-circle-notch animate-spin {spinnerClass}" />
</div>
