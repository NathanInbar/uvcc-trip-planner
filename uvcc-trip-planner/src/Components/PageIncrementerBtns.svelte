<script>
	import { page } from '../stores.js';

	export let up = true;
	export let down = true;

	function incrementPage() {
		$page = $page + 1;
	}
	function decrementPage() {
		$page = $page - 1;
		if ($page < 0) $page = 0;
	}
</script>

<span class="button__container">
	{#if down}
		<button
			on:click={() => {
				decrementPage();
			}}>Back</button
		>
	{/if}
	{#if up}
		<button
			on:click={() => {
				incrementPage();
			}}>Next</button
		>
	{/if}
</span>

<style>
	.button__container {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
