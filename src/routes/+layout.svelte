<script>
	import '../tailwind.css';
	import Nav from '../components/Nav.svelte';
	import { MY_TWITTER_HANDLE, MY_YOUTUBE, REPO_URL, SITE_TITLE } from '$lib/siteConfig';
	import SandstormBackground from '../components/SandstormBackground.svelte';
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title={'RSS Feed for ' + SITE_TITLE}
		href="/rss.xml"
	/>
</svelte:head>

<div>
	<SandstormBackground />
	<!-- Your other content -->
</div>
<div class="flex flex-col justify-center sm:px-8">
	<Nav />
</div>
<main class="flex flex-col justify-center sm:px-8">
	<slot />
</main>

<footer class="mx-auto flex w-full max-w-2xl flex-col items-start justify-center">
	<!-- <hr class="border-1 mb-8 w-full border-gray-200 dark:border-gray-800" />
	<div class="grid w-full max-w-2xl grid-cols-1 gap-4 px-4 pb-16 sm:grid-cols-2 sm:px-8">
		<div class="flex flex-col space-y-4">
			<a class="text-gray-500 transition hover:text-gray-300" href="/">Home</a>
			<a class="text-gray-500 transition hover:text-gray-300" href="/about">About</a>
			<a class="text-gray-500 transition hover:text-gray-300" href="/#newsletter">Newsletter</a>
			<a class="text-gray-500 transition hover:text-gray-300" href="/rss.xml" rel="external">
				RSS
			</a>
		</div>
		<div class="flex flex-col space-y-4">
			<a
				class="text-gray-500 transition hover:text-gray-300"
				target="_blank"
				rel="noopener noreferrer"
				href={'https://twitter.com/intent/follow?screen_name=' + MY_TWITTER_HANDLE}
			>
				Twitter
			</a>
			<a
				class="text-gray-500 transition hover:text-gray-300"
				target="_blank"
				rel="noopener noreferrer"
				href={REPO_URL}
			>
				GitHub
			</a>
			<a
				class="text-gray-500 transition hover:text-gray-300"
				target="_blank"
				rel="noopener noreferrer"
				href={MY_YOUTUBE}
			>
				YouTube
			</a>
		</div>
	</div> -->
	<p class="px-4 sm:px-8 text-xs tracking-tight text-gray-300 dark:text-gray-500">
		This site exists thanks to
		<a
			class="text-gray-500 transition hover:text-gray-300"
			href="https://swyxkit.netlify.app/"
			target="_blank"
			rel="noopener noreferrer">swyxkit</a
		>
		and is itself
		<a
			href="https://github.com/Nnadozie/swyxki"
			class="text-gray-500 transition hover:text-gray-300"
			target="_blank"
			rel="noopener noreferrer">open source</a
		>. © Nnadozie Okeke {new Date().getFullYear()}.
	</p>
	<div class="px-4 sm:px-8 text-xs tracking-tight text-gray-300 dark:text-gray-500">
		It draws inspiration from
	</div>
	<div class="px-4 sm:px-8 text-xs tracking-tight text-gray-300 dark:text-gray-500">
		<a
			class="text-gray-500 transition hover:text-gray-300"
			href="https://www.trychroma.com/"
			target="_blank"
			rel="noopener noreferrer">Try Chroma's Background</a
		>
	</div>
	<div class="px-4 sm:px-8 text-xs tracking-tight text-gray-300 dark:text-gray-500">
		<a
			class="text-gray-500 transition hover:text-gray-300"
			href="https://rubaiat-hossain.com/about/"
			target="_blank"
			rel="noopener noreferrer">Rubaiat Hossain's About Intro</a
		>
	</div>
	<div class="px-4 sm:px-8 text-xs tracking-tight text-gray-300 dark:text-gray-500">
		<a
			class="text-gray-500 transition hover:text-gray-300"
			href="https://kevinyien.com/story.html"
			target="_blank"
			rel="noopener noreferrer">Kevin Yien's Story Format</a
		>
	</div>
</footer>
