<script>
    import {response_mappings} from "../stores.js";
    export let caver
</script>

<p class="{caver.is_exec() == true ? "exec_member": "base_member"}">
    <span class="listing_main">
        #{String(caver.id+1).padStart(2, '0')}: {caver.firstname} {caver.lastname}
    </span>
    <span class="listing_detail">
        {#if caver.has_vehicle() != $response_mappings["Vehicle Capability Reponses"]["No Car"]}[Driver] [{caver.count_seats()}]
            {#if caver.has_vehicle() == $response_mappings["Vehicle Capability Reponses"]["Offroad Capable"]}[off-road]
            {:else}[&nbsp;&nbsp;city&nbsp;&nbsp;]
            {/if}
        {/if}
    </span>
</p>

<style>
    p {
        display: flex;
        justify-content: space-between;
        margin: 0;
    }

    .listing_main {
        /* text-decoration: underline; */
    }
    .listing_detail {
        opacity: 0.6;
        color: black;
    }
    
    .exec_member {
        color:darkgreen;
    }

    .base_member {
        color: darkslategrey;
    }
</style>