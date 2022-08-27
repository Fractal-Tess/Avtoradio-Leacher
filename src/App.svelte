<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Player from '$lib/components/Player.svelte';

  import { theme } from '$lib/stores/theme';
  import SimpleTransition from '$lib/components/SimpleTransition.svelte';
  import Loading from '$lib/components/Loading.svelte';
  import { audioStore } from '$lib/stores/audioStore';

  $: {
    document.documentElement.setAttribute('data-theme', $theme);
    document.documentElement.classList.value = $theme;
  }

  audioStore.load();
</script>

{#await theme.load() then}
  <div class="font-sans bg-base-100 text-base-content h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <SimpleTransition refreshKey={$audioStore.ready}>
        {#if $audioStore.ready}
          <Player />
        {:else}
          <Loading
            spinnerClass={'h-40 w-40'}
            textClass={'text-3xl font-extrabold mb-12'}
          />
        {/if}
      </SimpleTransition>
    </main>
    <Footer />
  </div>
{/await}
