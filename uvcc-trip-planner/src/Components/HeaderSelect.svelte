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
    <label for="example1">{label}</label>

    <select name="example" id="example1" bind:value={col} on:change={()=>{update_mapping();}}>
        <option value={-1}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</option>
        {#each $headers as header,i}
        <option value={i+1}>{header}</option>
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