<script>
  import BackgroundMusicPlayer from './BackgroundMusicPlayer.svelte';
  export let Hst;

  // Default state for controls
  let volume = 0.5;
  let isPlaying = true;
  let selectedCategory = 'ambient';
  let customTheme = {
    primary: '#facc15', // yellow-400
    secondary: '#1f2937', // gray-800
    text: '#111827', // gray-900
  };

  // Sample categories and tracks for demonstration
  const sampleCategories = [
    { id: 'ambient', name: 'Ambient' },
    { id: 'lofi', name: 'Lo-Fi' },
    { id: 'nature', name: 'Nature Sounds' }
  ];
</script>

<Hst.Story title="BackgroundMusicPlayer" layout={{ type: 'grid', width: '100%' }}>
  <Hst.Variant title="Default Player">
    <div class="dark:bg-gray-900 p-4">
      <BackgroundMusicPlayer {volume} {isPlaying} />
    </div>
  </Hst.Variant>

  <Hst.Variant title="With Custom Theme">
    <div class="dark:bg-gray-900 p-4">
      <BackgroundMusicPlayer {volume} {isPlaying} theme={customTheme} />
    </div>
  </Hst.Variant>

  <Hst.Variant title="Category Selection">
    <div class="dark:bg-gray-900 p-4">
      <BackgroundMusicPlayer 
        {volume} 
        {isPlaying} 
        category={selectedCategory}
        categories={sampleCategories}
      />
    </div>
  </Hst.Variant>

  <svelte:fragment slot="controls">
    <Hst.Number 
      bind:value={volume} 
      title="Volume" 
      min={0} 
      max={1} 
      step={0.1} 
    />
    <Hst.Boolean 
      bind:value={isPlaying} 
      title="Is Playing" 
    />
    <Hst.Select 
      bind:value={selectedCategory} 
      title="Music Category"
      options={sampleCategories.map(cat => ({ label: cat.name, value: cat.id }))}
    />
    <Hst.Text 
      bind:value={customTheme.primary} 
      title="Primary Color" 
    />
  </svelte:fragment>

  <svelte:fragment slot="docs">
    # BackgroundMusicPlayer Component

    A customizable background music player for your SvelteKit application.

    ## Basic Usage
    ```svelte
    <BackgroundMusicPlayer />
    ```

    ## Props
    - `volume` (number): Initial volume (0-1)
    - `isPlaying` (boolean): Initial playback state
    - `category` (string): Selected music category
    - `categories` (array): Available music categories
    - `theme` (object): Custom theme colors

    ## Events
    - `on:play`: Fired when music starts playing
    - `on:pause`: Fired when music is paused
    - `on:volumeChange`: Fired when volume is adjusted
    - `on:trackChange`: Fired when track changes
  </svelte:fragment>
</Hst.Story>
