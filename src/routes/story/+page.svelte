<script>
	const story = [
		{
			date: '1995-NOV-08',
			title: 'Born',
			details: []
		},
		{
			title: 'Grew up in Ibadan',
			details: [],
			link: null
		},
		{
			title: 'Went to ISI',
			details: ["we say 'Ibadan Kini so!'"],
			link: null
		},
		{
			title: 'Went to QMUL',
			details: [],
			link: 'https://www.qmul.ac.uk/'
		},
		{
			title: 'Built up QMUL AI & Robotics Society',
			details: [],
			link: 'https://www.qmul.ac.uk/'
		},
		{
			title: 'Swam with QMBL SWIM',
			details: [],
			link: 'https://www.qmul.ac.uk/'
		},
		{
			title: 'Tutored for Microprocessor Systems Design',
			details: [],
			link: 'https://www.qmul.ac.uk/'
		},
		{
			title: 'Studied Electrical and Electronics Engineering (Hons)',
			details: ['year in industry changed everything'],
			link: null
		},
		{
			title: 'Discovered Software Engineering at IBM Hursley',
			details: [],
			link: 'https://www.ibm.com/uk-en'
		},
		{
			title: 'Patented cool stuff',
			details: [],
			link: 'https://www.ibm.com/uk-en'
		},
		{
			title: 'Took a CS Optimization Methods Module at KCL',
			details: ['thank you, UK'],
			link: 'https://www.qmul.ac.uk/'
		},
		{
			title: 'Moved to Lagos',
			details: []
		},
		{
			title: 'Built things at Compex Africa',
			details: ['interim CTO taught me startup leadership']
		},
		{
			title: 'Started at SFS Group',
			details: ['learned Frontend development, React, agile and CI/CD from Andela']
		},
		{
			title: 'Started Fronte.io',
			details: ['indie consulting']
		},
		{
			title: 'Joined Access Bank',
			details: ['code at enterprise scale']
		},

		{
			title: 'Discovered remote work at KindHealth',
			details: ['everything changed']
		},
		{
			title: 'Wrote for Memberstack (YC S20)',
			details: []
		},
		{
			title: 'Built ShipFare',
			details: []
		},
		{
			title: 'Moved to Edmonton 🍁',
			details: []
		},

		{
			title: 'Taking it all in...',
			details: []
		}
	];
</script>

<div class="max-w-2xl mx-auto px-4 sm:px-8 py-16">
	<!-- Header quote -->
	<div class="text-center mb-16 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
		<p><span class="italic mb-4">Written by</span>&nbsp;Nnadozie Okeke</p>
		<h1 class="text-6xl font-bold text-center my-16">Story</h1>
		<blockquote class="font-serif italic text-gray-600 dark:text-gray-400">
			"When washing rice, preparing vegetables, and so on, do so with your own hands, with close
			attention, vigorous exertion, and a sincere mind. Do not indulge in a single moment of
			carelessness or laziness. Do not allow attentiveness to one thing result in overlooking
			another. Do not yield a single drop in the ocean of merit; [for] even a mountain of good karma
			can be augmented by a single particle of dust."
		</blockquote>
		<p class="mt-2 font-medium">
			— Dōgen, "<a
				href="https://terebess.hu/zen/dogen/Tenzo1.html"
				class="text-yellow-600 dark:text-yellow-400 hover:underline">Instructions for the Cook</a
			>" (Tenzo kyōkun)
		</p>
	</div>

	<!-- Story Timeline -->
	<div class="space-y-8">
		{#each story as item}
			<div class="mt-8">
				{#if item.date}
					<div class="font-mono text-sm text-gray-500 dark:text-gray-400 mb-8">{item.date}</div>
				{/if}

				{#if item.link}
					<a
						href={item.link}
						class="font-mono text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400"
						target="_blank"
						rel="noopener noreferrer"
					>
						{item.title}
					</a>
				{:else}
					<div class="font-mono text-gray-900 dark:text-white">{item.title}</div>
				{/if}

				{#if item.details.length > 0}
					{#each item.details as detail}
						<div class="font-serif italic text-gray-600 dark:text-gray-400 mt-8">{detail}</div>
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>
