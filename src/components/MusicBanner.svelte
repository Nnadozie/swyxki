<script>
	import { fade, fly } from 'svelte/transition';
	export let onContinue = () => {};
	export let visible = true;
</script>

{#if visible}
	<div
		in:fly={{ y: -50, duration: 500 }}
		out:fade
		class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4 bg-gradient-to-r from-yellow-400/90 via-red-500/90 to-pink-500/90 backdrop-blur-sm dark:from-yellow-600/90 dark:via-red-600/90 dark:to-pink-600/90"
		role="alert"
		aria-live="polite"
		style="margin-left: 0px;"
	>
		<div
			class="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4"
		>
			<div class="flex items-center gap-4">
				<div class="hidden sm:block animate-pulse">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-gray-900 dark:text-white"
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
				</div>
				<div>
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
						Experience this site with sound
					</h2>
					<p class="text-sm text-gray-800 dark:text-gray-200">
						Immerse yourself in a curated musical atmosphere
					</p>
				</div>
			</div>

			<button
				on:click={onContinue}
				class="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium transform transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
			>
				Continue with Sound
			</button>
		</div>
	</div>
{/if}
