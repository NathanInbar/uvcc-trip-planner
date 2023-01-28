<script>
    import {response_mappings, finished_trips} from "../stores.js";

</script>

    <!-- {Object.keys($finished_trips).length} -->
    <div class="trip__members">
        {#each Object.entries($finished_trips) as [name,trip]}
            
            
                <h4>{name}:<p>[{trip.get_seats()} Seats] [{trip.get_num_cavers()} Cavers]</p></h4>

                {#each trip.get_cavers() as caver}
                    <p class="{caver.is_exec() == true ? "exec_member":''}">
                    
                    {caver.firstname} {caver.lastname}
                    {#if caver.has_vehicle() != $response_mappings["Vehicle Capability Reponses"]["No Car"]}[Driver] [{caver.count_seats()}]
                        {#if caver.has_vehicle() == $response_mappings["Vehicle Capability Reponses"]["Offroad Capable"]}[offroad]
                        {:else}[city]
                        {/if}
                    {/if}
                    
                    </p>
                {/each}
            
        {/each}
    </div>

    <button>Download CSV</button>

<style>
    p {
        margin: 0;
    }
    button {
        margin-bottom: 1rem;
    }
    .trip__members {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 1rem;
    }
    .exec_member {
        color:darkgreen;
    }
</style>