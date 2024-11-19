<script>
	import { onMount } from 'svelte';

	/** @type {import('$lib/types').ContentItem[]} */
	export let items = [];

	/** @type {any[]} */
	let rssPosts = [];
	let loading = true;
	let error = null;

	// Filter paid posts (Memberstack and Sentry)
	$: paidPosts = items.filter(
		(post) =>
			post.category === 'Blog' ||
			post.link?.includes('memberstack.com') ||
			post.slug?.includes('codecov')
	);

	// Filter LinkedIn posts
	$: linkedInPosts = items.filter((post) => post.link?.includes('linkedin.com'));

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
	<h3 id="paid-posts" class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
		Commissioned Articles
	</h3>
	<ul class="space-y-2">
		{#each paidPosts as post (post.link || post.slug)}
			<li>
				<a
					class="font-bold text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 hover:underline dark:hover:text-yellow-300"
					href={post.link || post.slug}
					target="_blank"
					rel="noopener noreferrer"
				>
					{post.title}
				</a>
				{#if post.link?.includes('memberstack.com')}
					<span class="ml-2 text-xs bg-blue-500 px-2 py-1 rounded text-white"
						>Memberstack (YC S20)</span
					>
				{/if}
				{#if post.slug?.includes('codecov')}
					<span class="ml-2 text-xs bg-purple-500 px-2 py-1 rounded text-white">Sentry</span>
				{/if}
				{#if post.date}
					<span class="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline ml-2">
						{new Date(post.date).toISOString().slice(0, 10)}
					</span>
				{/if}
			</li>
		{/each}
	</ul>
	<h3 id="linkedin-posts" class="mt-8 mb-4 text-2xl font-bold text-gray-900 dark:text-white">
		LinkedIn Articles
	</h3>
	<ul class="space-y-2">
		{#each linkedInPosts as post (post.link)}
			<li>
				<a
					class="font-bold text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 hover:underline dark:hover:text-yellow-300"
					href={post.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					{post.title}
				</a>
				{#if post.date}
					<span class="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline ml-2">
						{new Date(post.date).toISOString().slice(0, 10)}
					</span>
				{/if}
			</li>
		{/each}
	</ul>

	<h3 id="hashnode-posts" class="mt-8 mb-4 text-2xl font-bold text-gray-900 dark:text-white">
		Hashnode Articles
	</h3>
	{#if loading}
		<p class="text-gray-600 dark:text-gray-400">Loading posts...</p>
	{:else if error}
		<p class="text-red-500">Error: {error}</p>
	{:else}
		<ul class="space-y-2">
			{#each rssPosts as post (post.link)}
				<li>
					<a
						class="font-bold text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 hover:underline dark:hover:text-yellow-300"
						href={post.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						{post.title}
					</a>
					{#if post.date}
						<span class="hidden text-xs text-gray-500 dark:text-gray-400 sm:inline ml-2">
							{new Date(post.date).toISOString().slice(0, 10)}
						</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</section>
