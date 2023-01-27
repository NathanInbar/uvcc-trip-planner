<script>
    import {request_plan} from "../stores.js";
	import ConfigPageHandler from "./ConfigPageHandler.svelte";

</script>

<div id="body__container">
    <div id="body__header__container">
        <img id="img__logo" src="/assets/UVCC_LOGO.jpg" alt="UVCC Logo"/>
        <h1>UVCC Trip Planner</h1>        
    </div>
    <div class="content__panel">

    </div>
    <div class="content__container">
    </div>
    <div id="content__container" class="content__panel">
        <!--CONFIG -->
        <ConfigPageHandler />
    </div>

    {#if $request_plan}
        <div class="loading__panel"><h1>planning . . .</h1></div>
    {/if}
</div>

<style>
    #body__header__container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #body__header__container > h1 {
        font-size: 6rem;
        margin: 0;
    }
    #img__logo {
        height: auto;
        width: 150px;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    #body__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 5% 2.5% 5% 2.5%;
        background-color: var(--dark_grey_fade);
    }
    #content__container {
        display: flex;
        flex-direction: column;
        margin: 1.5% 1.5% 2.5% 1.5%;
    }
    .content__panel {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--dark_grey_fade);
    }
    .loading__panel {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>