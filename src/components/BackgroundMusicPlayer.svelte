<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';

  // Props with defaults
  export let volume = 0.5;
  export let isPlaying = true;

  // Audio tracks configuration
  const tracks = [
    { id: 1, title: 'Ambient Music', url: '/music/ambient.mp3' },
    { id: 2, title: 'Lo-Fi Beats', url: '/music/lofi.flac' },
    { id: 3, title: 'Nature Sounds', url: '/music/nature.mp3' }
  ];

  // State management
  const audioPlayer = writable(null);
  let currentTrack = tracks[0];
  let isOpen = false;
  let audioElement;

  // Initialize audio on mount
  onMount(() => {
    if (browser) {
      audioElement = new Audio(currentTrack.url);
      audioElement.loop = true;
      audioElement.volume = volume;
      audioPlayer.set(audioElement);

      if (isPlaying) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback failed:', error);
          });
        }
      }
    }
  });

  // Cleanup on destroy
  onDestroy(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement = null;
    }
  });

  // Volume change handler
  $: if (audioElement) {
    audioElement.volume = volume;
  }

  // Play state handler
  $: if (audioElement) {
    if (isPlaying) {
      audioElement.play().catch(error => {
        console.error('Playback failed:', error);
        isPlaying = false;
      });
    } else {
      audioElement.pause();
    }
  }

  // Track change handler
  function changeTrack(track) {
    if (audioElement) {
      audioElement.src = track.url;
      currentTrack = track;
      if (isPlaying) {
        audioElement.play().catch(console.error);
      }
    }
  }

  function togglePlay() {
    isPlaying = !isPlaying;
  }

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<div class="fixed bottom-4 left-4 z-50">
  <button
    aria-label="Toggle music player"
    class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-gray-900 shadow-lg hover:bg-yellow-300 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
    on:click={toggleMenu}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
  </button>

  {#if isOpen}
    <div class="absolute bottom-12 left-0 w-64 rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Music Player</h3>
        <button
          aria-label="Close music player"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          on:click={toggleMenu}
        >
          ✕
        </button>
      </div>

      <div class="mb-4">
        <select
          class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          on:change={(e) => changeTrack(tracks.find(t => t.id === parseInt(e.target.value)))}
        >
          {#each tracks as track}
            <option value={track.id} selected={track.id === currentTrack.id}>
              {track.title}
            </option>
          {/each}
        </select>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <button
          aria-label={isPlaying ? 'Pause' : 'Play'}
          class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
          on:click={togglePlay}
        >
          {#if isPlaying}
            <span class="sr-only">Pause</span>
            ⏸️
          {:else}
            <span class="sr-only">Play</span>
            ▶️
          {/if}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          bind:value={volume}
          class="w-32"
          aria-label="Volume"
        />
      </div>
    </div>
  {/if}
</div>

<style>
  input[type="range"] {
    -webkit-appearance: none;
    @apply h-2 rounded-full bg-gray-200 dark:bg-gray-700;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply h-4 w-4 cursor-pointer rounded-full bg-yellow-400 dark:bg-yellow-600;
  }
</style> 