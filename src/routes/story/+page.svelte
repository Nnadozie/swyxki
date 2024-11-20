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
			link: 'https://www.london.ac.uk/federation/queen-mary-university-london'
		},
		{
			title: 'Built up QMUL AI & Robotics Society',
			details: []
		},
		{
			title: 'Swam with QMBL SWIM',
			details: []
		},
		{
			title: 'Studied Electrical and Electronics Engineering (Hons)',
			details: [],
			link: null
		},
		{
			title: 'Learned Java, C, Data structures, CPUs, TCP/IP, the works',
			details: ['year in industry changed everything']
		},
		{
			title: 'Discovered Software Engineering at IBM Hursley',
			details: []
		},
		{
			title: 'Patented cool stuff',
			details: ['thank you, UK']
		},
		{
			title: 'Moved to Lagos',
			details: []
		},
		{
			title: 'Built things at Compex Africa',
			details: []
		},
		{
			title: 'Compex Africa got acquired by SFS Group',
			details: ['being interim CTO for Compex Africa taught me startup team leadership']
		},
		{
			title: 'Learned React, Frontend development, agile and CI/CD from Andela',
			details: ['worldview changed - company not role, market not product, vertical not technology']
		},
		{
			title: 'Said goodbye to SFS Group. Started Fronte.io',
			details: ['indie consulting']
		},
		{
			title: 'Went broke. Joined Access Bank',
			details: ['code at enterprise scale']
		},

		{
			title: 'Discovered remote work at KindHealth',
			details: ['pure joy']
		},
		{
			title:
				'Laid off. Broke up with long-time partner. Wrote for Memberstack (YC S20) in the meantime',
			details: ['those were dark times']
		},
		{
			title: 'To the UK for Guncle duties!',
			details: ["a child's love made the world make sense"]
		},
		{
			title: 'Started building for ShipFare',
			details: [
				'building for a high-velocity company while babysitting a toddler full-time was insane work'
			]
		},
		{
			title: 'A break from Guncle duties - freedom!',
			details: [
				'or so I thought. My body broke down - couldn’t walk, with excruciating pain for 3 months'
			]
		},
		{
			title: 'Continued building for ShipFare',
			details: ['not sure I let on how much pain and stress I was under']
		},
		{
			title: 'Back to the UK for more Guncle duties!',
			details: ["a child's love made the world make sense again"]
		},
		{
			title: 'Continued building end-to-end features for ShipFare',
			details: ['realised I had all the skills to build my own SaaS products']
		},
		{
			title: 'Said goodbye to ShipFare',
			details: ['apparently burnout is real']
		},
		{
			title: 'Took a personal health sabbatical',
			details: ['lots of needed rest, rejuvenation and healing']
		},
		{
			title: 'Set up a global HQ mancave in Lagos',
			details: ['a whole story in itself']
		},
		{
			title: 'Canadian PR Came out',
			details: ['The Provice of Alberta gave me a provincial nomination in technology ✌️']
		},
		{
			title: 'Moved to Edmonton, Alberta 🍁',
			details: ['hello YEG! hello extended family!']
		},
		{
			title: 'Upskilled as an AI Engineer',
			details: [
				'LangChain, LLMs, Llama, Llamaindex, RAG Stack, Vector Databases, Prompt Engineering, the works'
			]
		},
		{
			title: 'Worldview changed again',
			details: ['cost to scale a product and marketing is everything']
		},
		{
			title: 'Re-focused on building my own SaaS products',
			details: ["let's see where 2 years take me"]
		},
		{
			title: "In the meantime, I'll need a job",
			details: ['open to opportunities']
		},
		{
			title: 'Big beautiful sigh. Taking it all in...',
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
