<script>
    import {page, headers, column_mappings, cavers} from "../stores.js";
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
                        data[i+$column_mappings["Details"]["Med/Rescue Cert. Status"]],
                        false, //default exec status             
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
    {loadDataToStores()}
    <h3 class="generic_header">Config Step 2 - Exec Selection</h3>
    
    <div class="config__panel">
        <h4>Select exec members:</h4>
        {#each $cavers as caver}
        <span>
            <input name="exec_select" type="checkbox" on:change={(event)=>{caver.exec_status=event.value;}}>
            <label for="exec_select" >{caver.firstname} {caver.lastname}</label>
        </span>
        {/each}
    </div>

    <PageIncrementerBtns/>
{/if}

