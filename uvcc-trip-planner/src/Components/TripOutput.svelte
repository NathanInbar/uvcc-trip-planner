<script>
    import {cavers, finished_trips} from "../stores.js";
	import CaverListing from "./CaverListing.svelte";


    var email_string = get_email_string();

    function get_email_string(){
        let out = "";
        Object.values($finished_trips).forEach(trip=> {
            trip.get_cavers().forEach(caver => {
                out.concat(`${caver.get_email()},`)
            })
        })
        return out;
    }

</script>
    <span class="member__legend">
        Filter Settings: execs with offroad capability > execs with cars > execs
                    > (IF trip does not have enough seats) members with cars
                    > members by time
    </span>

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

    </div>

    <h4>email string: </h4>
    <input type="text" bind:value={email_string} />

    <button>Download CSV</button>

<style>
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