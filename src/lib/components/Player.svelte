<script lang="ts">
  import Loading from '$lib/components/Loading.svelte';
  import Controls from '$lib/components/Controls.svelte';
  import { audioStore } from '$lib/stores/audioStore';
  import SimpleTransition from '$lib/components/SimpleTransition.svelte';
  import logo from '$assets/logo.png';
</script>

<div class="h-full flex flex-col justify-around items-center">
  <img
    class="rounded-3xl max-h-64"
    src={$audioStore.current.imageUrl || logo}
    alt="You should never be able to see this"
  />
  <div class="text-center px-8">
    <SimpleTransition refreshKey={$audioStore.current.title}>
      {#if $audioStore.current.title}
        <p class="text-xs">Currently playing</p>
        <h1 class="font-bold text-xl">
          {$audioStore.current.title}
          <span class="text-sm font-extrabold">by</span>
          {$audioStore.current.artist}
        </h1>
      {:else}
        <Loading spinnerClass={'h-10 w-10'} />
      {/if}
    </SimpleTransition>
  </div>
  <Controls />
</div>
