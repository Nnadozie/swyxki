<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';
  import { MusicLoader } from '$lib/musicLoader';

  // Props with defaults
  export let volume = 0.5;
  export let isPlaying = false;
  export let defaultTrack = "";

  // State management
  const audioPlayer = writable(null);
  let musicLoader = new MusicLoader();
  let tracks = [];
  let currentTrack = null;
  let isOpen = false;
  let audioElement;
  let audioContext;
  let gainNode;
  let categories = ['ambient', 'lofi', 'nature'];
  let selectedCategory = 'all';
  let isPageVisible = true;
  let hasUserInteracted = false;
  let isInitialized = false;

  // Initialize audio context and nodes
  async function initializeAudio() {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      if (audioElement) {
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(gainNode);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      return false;
    }
  }

  // Modified tryPlayAudio function with better error handling
  async function tryPlayAudio() {
    if (!audioElement || !hasUserInteracted || !isPageVisible) return;
    
    try {
      if (!audioContext) {
        const initialized = await initializeAudio();
        if (!initialized) return;
      }

      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      await audioElement.play();
    } catch (error) {
      console.error('Playback failed:', error);
      isPlaying = false;
      
      if (error.name === 'NotAllowedError') {
        hasUserInteracted = false; // Reset interaction flag
      }
    }
  }

  // Handle first user interaction
  function handleFirstInteraction() {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      isPlaying = true;
      if (isPlaying) {
        tryPlayAudio();
      }
    }
  }

  // Add visibility change handler
  function handleVisibilityChange() {
    isPageVisible = !document.hidden;
    if (!isPageVisible) {
      audioElement?.pause();
    } else if (isPlaying && hasUserInteracted) {
      tryPlayAudio();
    }
  }

  // Initialize on mount
  onMount(async () => {
    if (browser) {
      await musicLoader.scanMusicDirectory();
      tracks = musicLoader.getAllTracks();
      
      currentTrack = defaultTrack ? 
        tracks.find(t => t.id === defaultTrack) : 
        musicLoader.getRandomTrack();

      audioElement = new Audio(currentTrack?.url);
      audioElement.loop = true;
      audioElement.volume = volume;
      audioPlayer.set(audioElement);
      isInitialized = true;

      document.addEventListener('click', handleFirstInteraction);

      // Add visibility change listener
      document.addEventListener('visibilitychange', handleVisibilityChange);
      // Initialize visibility state
      isPageVisible = !document.hidden;
    }
  });

  // Cleanup on destroy
  onDestroy(() => {
    if (browser) {
      if (audioElement) {
        audioElement.pause();
        audioElement = null;
      }
      if (audioContext) {
        audioContext.close();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleFirstInteraction);

    }
  });

  // Volume change handler
  $: if (audioElement) {
    audioElement.volume = volume;
  }

  // Play state handler
  $: if (audioElement && isInitialized) {
    if (isPlaying && hasUserInteracted && isPageVisible) {
      tryPlayAudio();
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

  // Add new handlers
  function handleCategoryChange(category) {
    selectedCategory = category;
    tracks = category === 'all' ? 
      musicLoader.getAllTracks() : 
      musicLoader.getTracksByCategory(category);
  }

  function playRandomTrack() {
    const randomTrack = musicLoader.getRandomTrack();
    if (randomTrack) {
      changeTrack(randomTrack);
    }
  }
</script>

<div class="fixed bottom-4 left-4 z-50">
  <button
    aria-label="Toggle music player"
    class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-gray-900 shadow-lg hover:bg-yellow-300 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
    on:click={() => {
      toggleMenu();
    }}
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
          bind:value={selectedCategory}
          on:change={() => handleCategoryChange(selectedCategory)}
        >
          <option value="all">All Categories</option>
          {#each categories as category}
            <option value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          {/each}
        </select>
      </div>

      <div class="mb-4 max-h-48 overflow-y-auto">
        {#each tracks as track}
          <button
            class="w-full rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
            {currentTrack?.id === track.id ? 'bg-yellow-100 dark:bg-yellow-900' : ''}"
            on:click={() => changeTrack(track)}
          >
            {track.title}
          </button>
        {/each}
      </div>

      <div class="flex justify-between">
        <button
          class="rounded-md bg-yellow-400 px-3 py-1 text-sm text-gray-900 hover:bg-yellow-300 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
          on:click={playRandomTrack}
        >
          Random Track
        </button>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <button
          aria-label={isPlaying ? 'Pause' : 'Play'}
          class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
          on:click={() => {
            togglePlay();
          }}
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