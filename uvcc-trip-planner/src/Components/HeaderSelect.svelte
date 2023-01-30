<script>
	import { headers, column_mappings } from '../stores.js';

	export let section;
	export let label;
</script>

<span>
	<label for="headerSelect">{label}:&nbsp;</label>

	<select name="headerselect" id="headerSelect" bind:value={$column_mappings[section][label]}>
		<option selected disabled hidden value={null}>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</option
		>
		{#each $headers as header, i}
			<option value={i}>{header}</option>
		{/each}
	</select>
</span>

<style>
	span {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
