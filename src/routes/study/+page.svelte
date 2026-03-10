<script>
	import { SITE_URL, SITE_TITLE } from '$lib/siteConfig';

	// Study curriculum progress
	const studyTopics = [
		{
			title: 'Machine Learning Fundamentals',
			progress: 75,
			description: 'Deep learning, neural networks, and ML algorithms',
			currentTopic: 'Transformers and Attention Mechanisms',
			resources: ['Fast.ai', 'Deep Learning Specialization', 'Papers with Code'],
			status: 'in-progress'
		},
		{
			title: 'Advanced TypeScript',
			progress: 60,
			description: 'Type system mastery, generics, and advanced patterns',
			currentTopic: 'Conditional Types and Template Literal Types',
			resources: ['TypeScript Handbook', 'Advanced TypeScript Course', 'Open Source Projects'],
			status: 'in-progress'
		},
		{
			title: 'Cloud Architecture',
			progress: 85,
			description: 'AWS services, serverless, and distributed systems',
			currentTopic: 'Kubernetes and Container Orchestration',
			resources: ['AWS Documentation', 'Kubernetes in Action', 'Design Patterns'],
			status: 'in-progress'
		},
		{
			title: 'System Design',
			progress: 70,
			description: 'Scalable systems, databases, and performance optimization',
			currentTopic: 'Caching Strategies and CDN Implementation',
			resources: ['Designing Data-Intensive Applications', 'System Design Interview', 'Grokking Algorithms'],
			status: 'in-progress'
		},
		{
			title: 'AI/LLM Integration',
			progress: 90,
			description: 'Building applications with large language models',
			currentTopic: 'Fine-tuning and RAG Implementation',
			resources: ['OpenAI API Docs', 'LangChain Documentation', 'Hugging Face'],
			status: 'in-progress'
		},
		{
			title: 'Business Development',
			progress: 45,
			description: 'Product strategy, marketing, and growth hacking',
			currentTopic: 'SaaS Metrics and KPIs',
			resources: ['The Mom Test', 'Zero to One', 'Indie Hackers Community'],
			status: 'in-progress'
		},
		{
			title: 'Mathematical Foundations',
			progress: 30,
			description: 'Linear algebra, calculus, and probability theory',
			currentTopic: 'Eigenvalues and Eigenvectors',
			resources: ['3Blue1Brown', 'Khan Academy', 'MIT OpenCourseWare'],
			status: 'starting'
		},
		{
			title: 'Blockchain & Web3',
			progress: 20,
			description: 'Smart contracts, DeFi, and decentralized applications',
			currentTopic: 'Ethereum and Solidity Basics',
			resources: ['Ethereum.org Docs', 'CryptoZombies', 'Solidity by Example'],
			status: 'starting'
		}
	];

	function getStatusColor(status) {
		switch (status) {
			case 'completed': return 'bg-green-500';
			case 'in-progress': return 'bg-blue-500';
			case 'starting': return 'bg-yellow-500';
			default: return 'bg-gray-500';
		}
	}

	function getProgressColor(progress) {
		if (progress >= 80) return 'bg-green-500';
		if (progress >= 60) return 'bg-blue-500';
		if (progress >= 40) return 'bg-yellow-500';
		return 'bg-red-500';
	}
</script>

<svelte:head>
	<title>Study with Me - {SITE_TITLE}</title>
	<link rel="canonical" href={SITE_URL + '/study'} />
	<meta property="og:url" content={SITE_URL + '/study'} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Study with Me - {SITE_TITLE}" />
	<meta name="Description" content="Join my learning journey - track my progress through various technical and business topics." />
	<meta property="og:description" content="Join my learning journey - track my progress through various technical and business topics." />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Study with Me - {SITE_TITLE}" />
	<meta name="twitter:description" content="Join my learning journey - track my progress through various technical and business topics." />
</svelte:head>

<div
	class="flex flex-col items-start justify-center max-w-4xl px-4 pb-16 mx-auto border-gray-200 dark:border-gray-700 sm:px-8 w-full"
>
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white">
			Study with Me
		</h1>
		<p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
			Join my continuous learning journey. I'm constantly expanding my knowledge across various domains 
			of software engineering, AI, business development and REAL LIFE. Track my progress and study alongside me!
		</p>
	</div>

	<!-- Study Tool Section -->
	<div class="w-full mb-12">
		<div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
			<h2 class="text-2xl font-bold mb-4 text-black dark:text-white">My Study Tool</h2>
			<div class="flex flex-col md:flex-row items-center gap-6">
				<img 
					src="/studyTool.webp" 
					alt="Study Tool Screenshot" 
					class="w-full md:w-2/3 rounded-lg shadow-lg"
				/>
				<div class="flex-1">
					<p class="text-gray-700 dark:text-gray-300 mb-4">
						I've built a comprehensive study tool to help organize my learning materials, track progress, 
						and stay focused on my goals. It features spaced repetition, progress tracking, and intelligent 
						scheduling to optimize learning efficiency.
					</p>
					<a 
						href="https://dn61ibssacdj2.cloudfront.net/"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
					>
						Try My Study Tool
						<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Study Progress Overview -->
	<div class="w-full mb-8">
		<h2 class="text-3xl font-bold mb-6 text-black dark:text-white">Current Curriculum</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each studyTopics as topic}
				<div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
					<div class="flex justify-between items-start mb-3">
						<h3 class="text-xl font-semibold text-black dark:text-white">{topic.title}</h3>
						<span class="px-2 py-1 text-xs font-medium rounded-full {getStatusColor(topic.status)} text-white">
							{topic.status.replace('-', ' ')}
						</span>
					</div>
					
					<p class="text-gray-600 dark:text-gray-400 mb-4">{topic.description}</p>
					
					<div class="mb-3">
						<div class="flex justify-between text-sm mb-1">
							<span class="text-gray-500 dark:text-gray-400">Progress</span>
							<span class="font-medium text-gray-700 dark:text-gray-300">{topic.progress}%</span>
						</div>
						<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div 
								class="h-2 rounded-full transition-all duration-300 {getProgressColor(topic.progress)}"
								style="width: {topic.progress}%"
							></div>
						</div>
					</div>
					
					<div class="mb-4">
						<p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currently studying:</p>
						<p class="text-sm text-gray-600 dark:text-gray-400">{topic.currentTopic}</p>
					</div>
					
					<div>
						<p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resources:</p>
						<div class="flex flex-wrap gap-2">
							{#each topic.resources as resource}
								<span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
									{resource}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Study Philosophy -->
	<div class="w-full">
		<h2 class="text-2xl font-bold mb-4 text-black dark:text-white">My Study Philosophy</h2>
		<div class="prose prose-lg dark:prose-invert max-w-none">
			<p class="text-gray-700 dark:text-gray-300">
				I believe in <strong>consistent, focused learning</strong> rather than cramming. My approach combines:
			</p>
			<ul class="list-disc pl-6 text-gray-700 dark:text-gray-300">
				<li><strong>Spaced Repetition:</strong> Regular review of concepts to strengthen memory retention</li>
				<li><strong>Project-Based Learning:</strong> Applying knowledge through real-world projects</li>
				<li><strong>Cross-Domain Connections:</strong> Linking concepts across different fields</li>
				<li><strong>Community Engagement:</strong> Learning from others and sharing knowledge</li>
				<li><strong>Balance:</strong> Maintaining health and relationships while pursuing growth</li>
			</ul>
			<p class="text-gray-700 dark:text-gray-300 mt-4">
				This page is updated weekly to reflect my current progress. Feel free to study along with me or 
				reach out if you're working on similar topics!
			</p>
		</div>
	</div>
</div>

<style>
	.prose {
		color: inherit;
	}
	
	.prose strong {
		color: inherit;
		font-weight: 600;
	}
	
	.prose ul {
		list-style-type: disc;
	}
	
	.prose li {
		margin: 0.5rem 0;
	}
</style>
