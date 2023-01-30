<script>
    import {cavers, finished_trips} from "../stores.js";
	import CaverListing from "./CaverListing.svelte";

</script>
<div class="trip_output__container">
    <span class="member__legend">
        Filter Settings: execs with offroad capability > execs with cars > execs
                    > (IF trip does not have enough seats) members with cars
                    > members by time
    </span>
    <hr>
    <span class="member__legend">[Sign up # (by time)]: [First] [Last] ?[Driver] ?[Seats] ?[Vehicle Capability] </span>
    <!-- {Object.keys($finished_trips).length} -->
    <h3>total sign-ups: {$cavers.length}</h3>
    <div class="trip__members">
        {#each Object.entries($finished_trips) as [name,trip]}
            
                <h4>{name}:<p>[{trip.get_seats()} Seats] [{trip.get_num_cavers()} Cavers]</p></h4>
                
                <div class="listing_main">
                    {#each trip.get_cavers() as caver}
                        <CaverListing caver={caver}/>
                    {/each}
                </div>
            <div><hr></div>
        {/each}
    <h4>Runners-up:</h4>

        {#each $cavers as caver}
            {#if !caver.is_designated()}
                <CaverListing caver={caver} />
            {/if}
        {/each}


    <h4>email strings: </h4>
    <div class="emStr__container">
        {#each Object.entries($finished_trips) as [name,trip]}
            <div class="emStrs">
                <label for="emStr" style="text-decoration:underline">{name}:</label>
                {#each trip.get_cavers() as caver}
                    {caver.get_email()},
                {/each}
            </div>
        {/each}
    </div>
</div>

    <button hidden>Download CSV</button>
    </div>

<style>
    .trip_output__container {
        margin: 1rem;
    }
    .emStr__container {
        display: flex;
        flex-direction: row;
    }
    .emStrs {
        display: inline-block;
        max-width: 15rem;
        overflow-wrap: break-word;
        margin: 1rem;
    }

    hr {
        opacity: 0.2;
        border-top: 1px dotted black;
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

</style>