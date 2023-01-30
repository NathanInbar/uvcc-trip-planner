<script>
	import { trip_settings } from '../stores.js';
	export let caver;
</script>

<p class={caver.is_exec() ? 'exec_member' : 'base_member'}{$trip_settings['Ropes Training Required?'] && !caver.has_ropes_exp() ? ' invalid_member': ''}
			>
	<span class="listing_header">
		#{String(caver.id + 1).padStart(2, '0')}:
		<span class={caver.has_vehicle() ? 'listing_name__driver' : ''}>{caver.get_name()}</span>&nbsp;
	</span>

	<span class="listing_detail">
		{#if caver.has_vehicle()}
			[D][{caver.get_seats()}]{#if caver.has_offroad()}[4x4&nbsp;]{:else}[city]{/if}
		{/if}
	</span>
</p>

<style>
	p {
		display: flex;
		justify-content: space-between;
		margin: 0;
	}
	.listing_header {
		display: inline-block;
		white-space: nowrap;
		max-width: 45ch;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.listing_name__driver {
		text-decoration: underline;
	}
	.listing_detail {
		opacity: 0.6;
		color: black;
	}

	.exec_member {
		color: darkgreen;
	}

	.base_member {
		color: darkslategrey;
	}
	
	.invalid_member {
		color: darkred;
	}
</style>
