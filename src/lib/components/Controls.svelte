<script>
  import { audioStore } from '$lib/stores/audioStore';
</script>

<div class="flex justify-evenly w-full">
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
