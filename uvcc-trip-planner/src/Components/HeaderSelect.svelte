<script>
    import {headers, column_mappings} from "../stores.js";

    export let section;
    export let label;
    export let col;

    function update_mapping()
    {
        $column_mappings[section][label]=col;
        console.log($column_mappings);
    }

</script>

<span>
    <label for="headerSelect">{label}:&nbsp;</label>

    <select name="headerselect" id="headerSelect" bind:value={col} on:change={()=>{update_mapping();}}>
        <option selected disabled hidden value={-1}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</option>
        {#each $headers as header,i}
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