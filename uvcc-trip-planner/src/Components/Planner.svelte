<script>
    import {page, cavers, trip_settings, column_mappings, request_plan} from "../stores.js";
    import Trip from "../Structures/trip.js";

    $: if($request_plan)
    {
        plan_trip();
    }

    function plan_trip()
    {
        let max_cavers = $trip_settings["Maximum # of Cavers"];
        let max_seats = 0;
        let num_execs = 0;

        //first pass: split execs with cars evenly amongst trips

        //second pass: split the rest of the execs evenly
        
        //evaluate seats per trip. < max cavers?
        //yes- third pass: add drivers to each trip until seats >= max cavers, or end of list
        //no- skip third pass

        //evaluate empty spots per trip. (per trip: # seats - # cavers)
        //fourth pass: add non execs, non drivers, based on first come first serve (correlated w index in cavers list)

        //both trips should now be as full as they can be capped first by driver avail, then by hard cap.

        //---

        //add trips to store
        //disable request_plan
       

    }


</script>