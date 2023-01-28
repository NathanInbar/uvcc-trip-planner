<script>
    import {finished_trips} from "../stores.js";

</script>

    {Object.keys($finished_trips).length}
    {#each Object.entries($finished_trips) as [name,trip]}
        <h4>{name}:</h4>
        {#each trip.get_cavers() as caver}
            <p>{caver.firstname} {caver.lastname}</p>
        {/each}
    {/each}

<style>
    p {
        margin: 0;
    }
</style>