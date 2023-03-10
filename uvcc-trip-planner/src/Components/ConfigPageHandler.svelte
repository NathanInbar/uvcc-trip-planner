<script>
	import {
		DEBUG,
		page,
		headers,
		column_mappings,
		cavers,
		trip_settings,
		request_plan,
		exec_list,
		response_mappings
	} from '../stores.js';
	import HeaderSelect from './HeaderSelect.svelte';
	import PageIncrementerBtns from './PageIncrementerBtns.svelte';
	import Caver from '../Structures/Caver.js';
	import TripOutput from './TripOutput.svelte';

	var files = [];
	var data = [];

	function sanitizeData() {
		for (let i = 0; i < data.length; i++) {
			if (data[i][0] == ',') data[i] = data[i].substring(1);
		}
	}

	function loadHeaders() {
		//load headers to store
		for (let i = 0; i < data.length; i++) {
			if (data[i] == '\n') break;
			$headers.push(data[i]);
		}
	}

	function loadDataToStores() {
		//process csv rows into Caver object array, load into store
		let col_count = $headers.length + 1;
		let _cavers = [];

		for (let i = col_count, count = 0; i < data.length; i += col_count, count++) {
			//reached end of filled rows
			if (data[i + $column_mappings['Basic Info']['Timestamp']] == '') {
				break;
			}

			//find if this person is an exec
			let exec_status = false;
			if (
				$exec_list.includes(
					`${data[i + $column_mappings['Basic Info']['First Name']].trim()} ${data[
						i + $column_mappings['Basic Info']['Last Name']
					].trim()}`.toLowerCase()
				)
			) {
				exec_status = true;
			}

			let _info = {};
			//populate caver _info from this row of data
			for (const [section, labels] of Object.entries($column_mappings)) {
				for (const [label, col_num] of Object.entries(labels)) {
					let info_element = null;
					if (col_num != null || col_num != undefined) {
						info_element = data[i + col_num];
					}
					_info[label] = info_element;
				}
			}
			//add this person to cavers as a caver Object
			_cavers.push(new Caver(count, exec_status, _info));
		}

		$cavers = _cavers;
		$DEBUG && console.log($cavers);
	}

	$: if (files && files[0]) {
		//get csv file
		let file = files[0];
		$DEBUG && console.log(`${file.name}: ${file.size} bytes`);

		const re = /\n|(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/gm;

		//data => separated file text by column
		file.text().then((value) => {
			data = value.match(re);
		});
	}

	$: if (data && data[0]) {
		//happens on file select
		sanitizeData();
		loadHeaders();
	}

	//adjust the array size of trip day preferences dynamically based on how many days are entered
	$: if ($trip_settings['# of Seperate Trip Days'] > 0)
		$response_mappings['Trip Day Preferences'] = Array($trip_settings['# of Seperate Trip Days']);
</script>

{#if $page == 0}
	<h2>Select a trip file (Google Form csv):</h2>
	<input type="file" id="fileselector" bind:files accept=".csv" />
	<PageIncrementerBtns down={false} />
{:else if $page == 1}
	<h3 class="generic_header">Config Step 1 - Column Mapping</h3>

	<div class="config__panel">
		{#each Object.entries($column_mappings) as [section, items]}
			<h4>{section}:</h4>
			{#each Object.entries(items) as [label, _]}
				<HeaderSelect {section} {label} />
			{/each}
		{/each}
	</div>

	<PageIncrementerBtns />
{:else if $page == 2}
	<h3 class="generic_header">Config Step 2 - Trip Settings</h3>

	<div class="config__panel">
		<span>
			<label for="maxCavers">Maximum # of Cavers:</label>
			<input name="maxCavers" type="number" bind:value={$trip_settings['Maximum # of Cavers']} />
		</span>
		<span>
			<label for="tripDays"># of Seperate Trip Days:</label>
			<input
				type="number"
				bind:value={$trip_settings['# of Seperate Trip Days']}
				name="tripDays"
				id="tripDays"
			/>
		</span>
		<span>
			<label for="rtReq">Ropes Training Required?</label>
			<input
				type="checkbox"
				bind:value={$trip_settings['Ropes Training Required?']}
				name="rtReq"
				id="rtReq"
			/>
		</span>
	</div>

	<PageIncrementerBtns />
{:else if $page == 3}
	<h3 class="generic_header">Config Step 3 - Response Mapping</h3>
	<p>map the given information to text response EXACTLY as it appears in the spreadsheet</p>

	<div class="config__panel">
		<span class="settings__span">
			<h4 for="tripDays">Trip Day Preference Responses (if applicable):</h4>
		</span>

		{#each $response_mappings['Trip Day Preferences'] as _, i}
			<span class="settings__span">
				<label for="">Day {i + 1}:</label>
				<input
					class="settings__input"
					type="text"
					bind:value={$response_mappings['Trip Day Preferences'][i]}
				/>
			</span>
		{/each}

		<span class="settings__span">
			<label for="">Either/Any:</label>
			<input
				class="settings__input"
				type="text"
				bind:value={$response_mappings['Either Day Response']}
			/>
		</span>

		<h4 for="tripDays">Vehicle Capability Responses:</h4>
		{#each Object.entries($response_mappings['Vehicle Capability Responses']) as [label, _]}
			<span class="settings__span">
				<label for="">{label}:</label>
				<input
					class="settings__input"
					type="text"
					bind:value={$response_mappings['Vehicle Capability Responses'][label]}
				/>
			</span>
		{/each}
	</div>

	<PageIncrementerBtns />
{:else if $page == 4}
	<p hidden>{loadDataToStores()}</p>
	<!--loads data into caver objects-->
	<h3 class="generic_header">Config Step 4 - Exec Selection</h3>

	<div class="config__panel">
		<h4>Select exec members:</h4>
		{#each $cavers as caver}
			<span>
				<input
					name="exec_select"
					type="checkbox"
					checked={caver.is_exec()}
					on:change={(event) => {
						caver.set_exec(event.value);
					}}
				/>
				<label for="exec_select">{caver.get_name()}</label>
			</span>
		{/each}
	</div>

	<PageIncrementerBtns up={false} />
	<button
		id="process_form_btn"
		on:click={() => {
			$request_plan = true;
			$page = $page + 1;
		}}>Plan!</button
	>
{:else if $page == 5}
	{#if $request_plan == false}
		<div style="max-width:min-content">
			<TripOutput />
		</div>
	{/if}
{/if}

<style>
	.settings__span {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.settings__input {
		width: 50ch;
	}
	p {
		margin-bottom: 0.5rem;
		text-decoration: underline;
	}
	.config__panel {
		display: flex;
		flex-direction: column;
	}

	#process_form_btn {
		margin: 1rem 5rem 1rem 5rem;
	}
</style>
