<script>
	import { fly } from 'svelte/transition';

	export let email = '';
	export let cta = 'send me';
	export let noun = 'a message';
	export let dialogText = 'Email copied to clipboard: ';
	export let class_ = '';

	let showDialog = false;
	let dialogTimeout;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			showDialog = true;

			// Clear any existing timeout
			if (dialogTimeout) clearTimeout(dialogTimeout);

			// Set new timeout to hide dialog
			dialogTimeout = setTimeout(() => {
				showDialog = false;
			}, 5000);
		} catch (err) {
			console.error('Failed to copy email:', err);
		}
	}

	function hideDialog() {
		showDialog = false;
		if (dialogTimeout) clearTimeout(dialogTimeout);
	}

	// Cleanup on component destruction
	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (dialogTimeout) clearTimeout(dialogTimeout);
	});
</script>

<div class="relative">
	<div
		class="flex items-center group hover:translate-x-1 transition-transform duration-200 font-mono"
	>
		<span class="opacity-75 mr-2">{cta}</span>
		<button on:click={copyEmail} class={class_} aria-label="Copy email address to clipboard">
			{noun}
		</button>
	</div>

	{#if showDialog}
		<div
			transition:fly={{ y: -10, duration: 200 }}
			class="absolute bottom-full left-0 mb-2 p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
			role="alert"
		>
			<div class="flex items-center justify-between">
				<p class="text-sm text-gray-800 dark:text-gray-200">
					{dialogText}<span class="font-mono">{email}</span>
				</p>
				<button
					on:click={hideDialog}
					class="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					aria-label="Close dialog"
				>
					✕
				</button>
			</div>
		</div>
	{/if}
</div>
