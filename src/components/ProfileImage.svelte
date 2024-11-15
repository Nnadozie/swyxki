<script>
	import { page } from '$app/stores';
	export let src = '/dozie.jpeg';
	export let alt = 'Dozie from another life';
	let imgError = false;
</script>

{#if !$page.url.pathname.includes('/story')}
	<div class="relative flex items-center">
		{#if !imgError}
			<img
				{src}
				{alt}
				class="h-[50px] w-[50px] rounded-full bg-cyan-300 bg-opacity-25"
				on:error={() => (imgError = true)}
			/>
		{:else}
			<div
				class="h-[50px] w-[50px] rounded-full bg-cyan-300 bg-opacity-25 flex items-center justify-center"
			>
				<span class="text-cyan-800 text-xl">
					{alt.charAt(0).toUpperCase()}
				</span>
			</div>
		{/if}
	</div>
{/if}
