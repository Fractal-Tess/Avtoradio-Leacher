<script lang="ts">
  import { fade } from 'svelte/transition';
  export let transitionDuration = 500;
  export let refreshKey: any;
  let _class = '';
  export { _class as class };
</script>

<div class="grid {_class} h-full">
  {#key refreshKey}
    <div
      class="row-end-1 col-end-1"
      in:fade={{
        delay: transitionDuration,
        duration: transitionDuration
      }}
      out:fade={{ duration: transitionDuration }}
    >
      <slot />
    </div>
  {/key}
</div>
