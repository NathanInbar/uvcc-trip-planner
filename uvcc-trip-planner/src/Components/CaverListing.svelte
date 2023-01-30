<script>
    import {response_mappings} from "../stores.js";
    export let caver
</script>
    <p class="{caver.is_exec() == true ? "exec_member": "base_member"}">
        <span class="listing_header">
            #{String(caver.id+1).padStart(2, '0')}: <span class="{caver.get_vehicle_ans() != $response_mappings["Vehicle Capability Reponses"]["No Car"] ? "listing_name__driver" : ''}">{caver.firstname} {caver.lastname}</span>&nbsp;
        </span>
        <span class="listing_detail">
            {#if caver.get_vehicle_ans() != $response_mappings["Vehicle Capability Reponses"]["No Car"]}
                [D][{caver.count_seats()}]{#if caver.get_vehicle_ans() == $response_mappings["Vehicle Capability Reponses"]["Offroad Capable"]}[4x4&nbsp;]
                {:else}[city]
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
        color:darkgreen;
    }

    .base_member {
        color: darkslategrey;
    }
</style>