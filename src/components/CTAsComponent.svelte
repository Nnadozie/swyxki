<script>
	/** @type {{ cta: string; noun: string; link: string; newWindow: boolean }[]} */
	export let ctas = [];
</script>

<section class="mb-8 w-full">
	<ul class="space-y-2 text-white">
		{#each ctas as cta}
			<li class="flex items-center group">
				<span class="text-gray-400 dark:text-gray-600 mr-2">{cta.cta}</span>
				<a
					href={cta.link}
					class="font-bold"
					data-sveltekit-preload-data
					target={cta.newWindow ? '_blank' : '_self'}
					rel={cta.newWindow ? 'noopener noreferrer' : ''}
				>
					{cta.noun}
				</a>
			</li>
		{/each}
	</ul>
</section>
