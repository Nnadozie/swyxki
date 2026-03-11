<script>
	import CTAsComponent from '../components/CTAsComponent.svelte';
	import CopyEmailCTA from '../components/CopyEmailCTA.svelte';
	import NamePronunciation from '../components/NamePronunciation.svelte';
	import {
		SITE_URL,
		REPO_URL,
		SITE_TITLE,
		SITE_DESCRIPTION,
		DEFAULT_OG_IMAGE,
		MY_TWITTER_HANDLE
	} from '$lib/siteConfig';

	/** @type {import('./$types').PageData} */
	export let data;
	// technically this is a slighlty different type because doesnt have 'content' but we'll let it slide
	/** @type {import('$lib/types').ContentItem[]} */
	$: items = data.items;

	const ctas = [
		{ cta: 'read my', noun: 'story', link: '/story', newWindow: false, rank: 1 },
		{
			cta: 'explore my',
			noun: 'software craftsmanship',
			link: 'https://github.com/Nnadozie?tab=overview&from=2023-12-01&to=2023-12-31',
			newWindow: false,
			rank: 6
		},
		{
			cta: 'Study with me. Use my',
			noun: 'study tool',
			link: '/study',
			newWindow: false,
			rank: 2.5
		},
		{
			cta: 'Support',
			noun: 'art for peace and good Karma',
			link: 'https://linktr.ee/dForSoulArt',
			newWindow: false,
			rank: 2.5
		},
		{
			cta: 'send me',
			noun: 'a message',
			link: '/contact',
			newWindow: false,
			rank: 10,
			handler: CopyEmailCTA,
			props: {
				email: 'dozie@fronte.io'
			}
		},
		{
			cta: 'learn from my',
			noun: 'technical writing',
			link: '/writing',
			newWindow: false,
			rank: 4
		},
		{
			cta: 'schedule',
			noun: 'a meeting for today',
			link: 'https://calendar.app.google/AvzRhSKyBSA9EYJS6',
			newWindow: false,
			rank: 1.3
		},

		{
			cta: 'watch my',
			noun: 'technical videos',
			link: 'https://www.youtube.com/@doziedev',
			newWindow: false,
			rank: 4
		},
		{
			cta: 'view my',
			noun: 'everyday thoughts',
			link: 'https://x.com/dozieokk',
			newWindow: false,
			rank: 5
		},
		{
			cta: 'peruse my',
			noun: 'product ideas',
			link: 'https://trello.com/c/dXJc1Ryq',
			newWindow: false,
			rank: 3
		},
		{
			cta: 'read my',
			noun: 'personal essays',
			link: 'https://medium.com/@dozieokk',
			newWindow: false,
			rank: 7
		},
		{
			cta: 'enjoy my',
			noun: 'poetry',
			link: 'https://github.com/Nnadozie/my-angular-website/blob/master/src/assets/files/collection.pdf',
			newWindow: false,
			rank: 8
		},
		{
			cta: 'connect with me on',
			noun: 'LinkedIn',
			link: 'https://www.linkedin.com/in/nnadozie-okeke/',
			newWindow: false,
			rank: 9
		}
	];
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<link rel="canonical" href={SITE_URL} />
	<link rel="alternate" type="application/rss+xml" href={SITE_URL + '/rss.xml'} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta name="Description" content={SITE_DESCRIPTION} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
</svelte:head>

<div
	class="flex flex-col items-start justify-center max-w-2xl px-4 pb-16 mx-auto w-full"
>
	<div class="flex flex-col-reverse items-start sm:flex-row">
		<div class="flex flex-col pr-8">
			<h2 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl drop-shadow-lg">
				<span
					class="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-white/80 dark:before:bg-gray-800/80"
				>
					<NamePronunciation name="Dozie" />
				</span>
			</h2>
			<h2 class="mb-3 text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 md:text-2xl drop-shadow-lg">
				<span
					class="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-white/70 dark:before:bg-gray-800/70"
				>
					<span class="relative text-gray-700 dark:text-gray-200 skew-y-3">Software and AI Engineer</span>
				</span>
			</h2>
		</div>
	</div>

	<CTAsComponent {ctas} />
</div>
