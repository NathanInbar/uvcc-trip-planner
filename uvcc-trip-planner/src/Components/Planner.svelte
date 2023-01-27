<script>
    import {page, cavers, trip_settings, column_mappings, request_plan} from "../stores.js";
    import Trip from "../Structures/trip.js";

    $: if($request_plan)
    {
        plan_trip();
    }

    const regex_yes = /yes/i;
    const regex_no = /no/i;
    const regex_either = /saturday|sunday|monday|tuesday|wednesday|thursday|friday/i;

    function plan_trip()
    {
        let max_cavers = $trip_settings["Maximum # of Cavers"];
        let max_seats = 0;

        let num_execs = 0;

        let day_options = [] //ex: Saturday, Sunday, Either day
        day_options[0] = $cavers[0].trip_day;

        //add unique entries for trip day preference, count seats, execs
        $cavers.forEach(caver => {
            if(!day_options.includes(caver.trip_day))
                day_options.push(caver.trip_day);

            if(regex_yes.test(caver.vehicle_owner_status))
                max_seats+=parseInt(caver.vehicle_seat_count);

            if(caver.exec_status == true)
                num_execs+=1;
        });

        day_options.filter(day => day.search(regex_either))

        let trips = []
        for (let i = 0; i < day_options.length-1;i++)
            trips.push(new Trip(day_options[i]));

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