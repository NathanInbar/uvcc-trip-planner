<script>
    import {response_mappings, finished_trips} from "../stores.js";

</script>
    <span class="member__legend">Sign up #: First Last ?[Driver] ?[Seats] ?[Vehicle Capability] </span>
    <!-- {Object.keys($finished_trips).length} -->
    <div class="trip__members">
        {#each Object.entries($finished_trips) as [name,trip]}
            
            
                <h4>{name}:<p>[{trip.get_seats()} Seats] [{trip.get_num_cavers()} Cavers]</p></h4>

                {#each trip.get_cavers() as caver}
                    <p class="{caver.is_exec() == true ? "exec_member":''}">
                    
                    {caver.id+1}: {caver.firstname} {caver.lastname}
                    {#if caver.has_vehicle() != $response_mappings["Vehicle Capability Reponses"]["No Car"]}[Driver] [{caver.count_seats()}]
                        {#if caver.has_vehicle() == $response_mappings["Vehicle Capability Reponses"]["Offroad Capable"]}[offroad]
                        {:else}[city]
                        {/if}
                    {/if}
                    
                    </p>
                {/each}
            
        {/each}
    </div>

    <button hidden>Download CSV</button>

<style>
    p {
        margin: 0;
    }
    button {
        margin-bottom: 1rem;
    }
    .member__legend {
        margin-top: 1rem;
        color: var(--dark_grey);
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