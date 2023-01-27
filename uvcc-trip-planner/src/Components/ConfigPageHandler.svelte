<script>
    import { each } from "svelte/internal";
import {page, headers, column_mappings} from "../stores.js";
	import HeaderSelect from "./HeaderSelect.svelte";

    var files = []
    var data = []

    function incrementPage() {$page = $page+1;}
    function decrementPage() {$page = $page-1; if ($page < 0) $page = 0;}

    $: if (files && files[0]) {
        let file = files[0];
        console.log(`${file.name}: ${file.size} bytes`);
        
        const re = /\n|(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/gm;
        
        file.text().then( (value) => 
        {
            data = value.match(re);
        })


    }     
    $: if (data) {

        for(let i = 0; i < data.length; i++)
        {
            if(data[i] == '\n')
                break;
            if(data[i][0] == ",")
                data[i] = data[i].substring(1);
            $headers.push(data[i])
        }
        //headers=headers;//svelte reactivity.
    }
// - - -
    var is_multi_day = false;

</script>

{#if $page==0}
    <h2>Select a trip file (Google Form csv):</h2>
    <input type="file" id="fileselector" bind:files accept=".csv"/>
    <span class="button__container">
        <button on:click={()=>{incrementPage()}}>Next</button>
    </span>
{:else if $page==1}

    <h3 class="generic_header">Config Step 1 - Column Mapping</h3>

    <div class="config__panel">
        {#each Object.entries($column_mappings) as [section,items]}
            <h4>{section}:</h4>
            {#each Object.entries(items) as [label,col_val]}
            <HeaderSelect section={section} label={label} col={col_val}/>
            {/each}
        {/each}


    </div>

    <span class="button__container">
        <button on:click={()=>{decrementPage()}}>Back</button>
        <button on:click={()=>{incrementPage()}}>Next</button>
    </span>
{:else if $page==2}

    <h3 class="generic_header">Config Step 2 - Selection Priority</h3>

    <div class="config__panel">
        <h4>Basic Info:</h4>
        <HeaderSelect label={"Timestamp: "} />
        <HeaderSelect label={"First Names: "} />
        <HeaderSelect label={"Last Names: "} />
        <HeaderSelect label={"UVic #: "} />
        <HeaderSelect label={"Email: "} />
        
        <h4>Details:</h4>
        <HeaderSelect label={"Med Insurance Status: "} />
        <HeaderSelect label={"Newcomer Status: "} />
        <HeaderSelect label={"Vehicle Owner Status: "} />
        <HeaderSelect label={"Med/Rescue Cert. Status: "} />

    </div>

    <span class="button__container">
        <button on:click={()=>{decrementPage()}}>Back</button>
        <button on:click={()=>{incrementPage()}}>Next</button>
    </span>
{/if}

<style>
    .button__container {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
</style>