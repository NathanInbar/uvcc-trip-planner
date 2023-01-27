<script>
    import {page, headers, column_mappings, cavers, trip_settings, request_plan, exec_list} from "../stores.js";
	import HeaderSelect from "./HeaderSelect.svelte";
	import PageIncrementerBtns from "./PageIncrementerBtns.svelte";
    import Caver from "../Structures/caver.js";

    var files = []
    var data = []

    function sanitizeData()
    {
        for(let i = 0; i < data.length; i++)
        {
            if(data[i][0] == ",")
                data[i] = data[i].substring(1);
        }
    }
    function loadHeaders()
    {
        //load headers to store
        for(let i = 0; i < data.length; i++)
        {
            if(data[i] == '\n')
                break;
            $headers.push(data[i])
        }
        //remove headers from data
        //data.splice(0,$headers.length+1);
        //console.log(data);

    }

    function loadDataToStores()
    {

        //process csv rows into Caver object array, load into store
        let col_count = $headers.length+1
        let _cavers = []

        let count=0;
        for(let i = col_count; i < data.length; i+=col_count)
        {
            if (data[i+$column_mappings["Basic Info"]["Timestamp"]] == ''){break;}

            let exec_status = false;
            if($exec_list.includes(
                `${data[i+$column_mappings["Basic Info"]["First Name"]].trim()} ${data[i+$column_mappings["Basic Info"]["Last Name"]].trim()}`
                .toLowerCase()
            )){
               exec_status = true; 
            }

            _cavers.push(
                    new Caver(
                        count,
                        data[i+$column_mappings["Basic Info"]["Timestamp"]],
                        data[i+$column_mappings["Basic Info"]["First Name"]],
                        data[i+$column_mappings["Basic Info"]["Last Name"]],
                        data[i+$column_mappings["Basic Info"]["UVic #"]],
                        data[i+$column_mappings["Basic Info"]["Email"]],
                        data[i+$column_mappings["Basic Info"]["Phone"]],
                        data[i+$column_mappings["Emergency Info"]["Name"]],
                        data[i+$column_mappings["Emergency Info"]["Relation"]],
                        data[i+$column_mappings["Emergency Info"]["Phone"]],
                        data[i+$column_mappings["Details"]["Med Insurance Status"]],
                        data[i+$column_mappings["Details"]["Newcomer Status (Caves)"]],
                        data[i+$column_mappings["Details"]["Newcomer Status (Ropes)"]],
                        data[i+$column_mappings["Details"]["Vehicle Owner Status"]],
                        data[i+$column_mappings["Details"]["Vehicle Seat Count"]],
                        data[i+$column_mappings["Details"]["Med/Rescue Cert. Status"]],
                        exec_status,            
                        data[i+$column_mappings["Misc"]["Trip Day (if applicable)"]],          
                    
                    )
                );
            count+=1;
        }
        $cavers = _cavers;
        console.log($cavers);
    }

    $: if (files && files[0]) {
        let file = files[0];
        console.log(`${file.name}: ${file.size} bytes`);
        
        const re = /\n|(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/gm;
        
        file.text().then( (value) => 
        {
            data = value.match(re);
        })

    }     

    $: if (data && data[0]) {
        sanitizeData();
        loadHeaders();
    }
    

</script>

{#if $page==0}
    <h2>Select a trip file (Google Form csv):</h2>
    <input type="file" id="fileselector" bind:files accept=".csv"/>
    <PageIncrementerBtns down={false}/>
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

    <PageIncrementerBtns/>
{:else if $page==2}
    <p hidden>{loadDataToStores()}</p>
    <h3 class="generic_header">Config Step 2 - Exec Selection</h3>
    
    <div class="config__panel">
        <h4>Select exec members:</h4>
        {#each $cavers as caver}
        <span>
            <input name="exec_select" type="checkbox" checked={caver.exec_status} on:change={(event)=>{caver.exec_status=event.value;}}>
            <label for="exec_select" >{caver.firstname} {caver.lastname}</label>
        </span>
        {/each}
    </div>

    <PageIncrementerBtns/>
{:else if $page==3}
    <h3 class="generic_header">Config Step 3 - Trip Settings</h3>

    <div class="config__panel">
        <span>
            <label for="maxCavers">Maximum # of Cavers:</label>
            <input name="maxCavers" type="number" on:change={(event)=>{$trip_settings["Maximum # of Cavers"]=event.value;}}/>
        </span>

    </div>
    <button id="process_form_btn" on:click={()=>{$request_plan=true}}>Plan!</button>
{/if}
<style>
    .config__panel {
        display: flex;
        flex-direction: column;
    }

    #process_form_btn {
       margin: 1rem 5rem 1rem 5rem;
    }
</style>