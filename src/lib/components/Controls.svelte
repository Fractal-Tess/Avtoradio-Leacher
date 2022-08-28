<script>
  import { audioStore } from '$lib/stores/audioStore';

  let volume = $audioStore.volume;
</script>

<div class="flex flex-col w-full space-y-4">
  <div class="flex justify-evenly">
    <button
      class="btn btn-sm btn-secondary {$audioStore.isPlaying
        ? ''
        : 'btn-outline'}"
      on:click={audioStore.play}>Play</button
    >
    <button
      class="btn btn-sm btn-secondary {!$audioStore.isPlaying
        ? ''
        : 'btn-outline'}"
      on:click={audioStore.pause}>Pause</button
    >
  </div>

  <div class="flex px-12 space-x-2 items-center">
    <i class="fa-solid fa-volume-high select-none" draggable="false" />
    <input
      type="range"
      min="0"
      max="100"
      bind:value={$audioStore.volume}
      class="range range-accent range-xs"
    />
  </div>
</div>
