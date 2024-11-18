<script>
	import { onMount } from 'svelte';

	/** @type {import('$lib/types').ContentItem[]} */
	export let items = [];

	/** @type {any[]} */
	let rssPosts = [];
	let loading = true;
	let error = null;

	async function fetchRSSPosts() {
		try {
			const response = await fetch('/api/latest-posts');
			if (!response.ok) throw new Error('Failed to fetch posts');
			rssPosts = await response.json();
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchRSSPosts();
	});
</script>

<section class="mb-8 w-full">
	<h3
		id="latest"
		class="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl"
	>
		Latest Posts
	</h3>

	{#if loading}
		<p class="text-gray-600 dark:text-gray-400">Loading posts...</p>
	{:else if error}
		<p class="text-red-500">Error: {error}</p>
	{:else}
		<ul class="space-y-2 text-white">
			{#each [...items, ...rssPosts] as post (post.link || post.slug)}
				<li>
					<a
						class="font-bold"
						href={post.link || post.slug}
						target={post.link ? '_blank' : '_self'}
						rel={post.link ? 'noopener noreferrer' : ''}
					>
						{post.title}
					</a>
					{#if post.date}
						<span class="hidden text-xs text-black dark:text-gray-400 sm:inline">
							{new Date(post.date).toISOString().slice(0, 10)}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}

	<a
		class="mt-2 flex h-6 rounded-lg leading-7 text-gray-600 transition-all dark:text-gray-400 dark:hover:text-gray-200"
		href="/blog"
	>
		Search and see all posts
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="ml-1 h-6 w-6">
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
			/>
		</svg>
	</a>
</section>
