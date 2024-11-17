<script>
	import { darkMode } from '$lib/darkMode';
	import { goto } from '$app/navigation';

	/** @type {{ cta: string; noun: string; link: string; newWindow: boolean; rank: number; handler?: any }[]} */
	export let ctas = [];

	// Use the dark mode store
	$: isDark = $darkMode;

	function getRankStyles(rank) {
		if (rank <= 1) return 'text-2xl font-bold tracking-tight text-gray-900 dark:text-white';
		if (rank <= 2) return 'text-xl font-semibold tracking-tight text-gray-800 dark:text-white';
		if (rank <= 3) return 'text-lg font-medium tracking-tight text-gray-800 dark:text-white';
		if (rank <= 4) return 'text-base font-medium tracking-tight text-gray-700 dark:text-white';
		if (rank <= 6) return 'text-sm tracking-tight text-gray-600 dark:text-gray-100';
		if (rank <= 8) return 'text-sm tracking-tight text-gray-500 dark:text-gray-300';
		if (rank <= 10) return 'text-xs tracking-tight text-gray-400 dark:text-gray-400';
		return 'text-xs tracking-tight text-gray-400 dark:text-gray-500';
	}

	function getLinkStyles(rank, isDark) {
		const baseStyles =
			'text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 hover:underline dark:hover:text-yellow-300 transition-colors duration-200';
		const rankStyles = getRankStyles(rank);
		const darkStyles = rank > 1 && isDark ? '!text-white' : '';

		return `${rankStyles} ${baseStyles} ${darkStyles}`;
	}

	function handleClick(event, cta) {
		if (cta.newWindow) return; // Let default behavior handle new windows

		if (cta.link.startsWith('/')) {
			// Only handle internal links
			event.preventDefault();
			goto(cta.link, { noscroll: true });
		}
	}
</script>

<section class="mb-8 w-full max-w-3xl mx-auto">
	<ul class="space-y-3">
		{#each ctas as cta}
			<li class={getRankStyles(cta.rank)}>
				{#if cta.handler}
					<svelte:component
						this={cta.handler}
						{...cta.props}
						class_={getLinkStyles(cta.rank, isDark)}
					/>
				{:else}
					<div
						class="flex items-center group hover:translate-x-1 transition-transform duration-200 font-mono"
					>
						<span class="opacity-75 mr-2">{cta.cta}</span>
						<a
							class={getLinkStyles(cta.rank, isDark)}
							href={cta.link}
							target={cta.newWindow ? '_blank' : '_self'}
							rel={cta.newWindow ? 'noopener noreferrer' : ''}
							on:click={(e) => handleClick(e, cta)}
						>
							{cta.noun}
						</a>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>
