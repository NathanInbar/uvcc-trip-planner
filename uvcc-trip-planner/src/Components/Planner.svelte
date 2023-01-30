<script>
    import {DEBUG, cavers, finished_trips, trip_settings, response_mappings, request_plan} from "../stores.js";
	import Caver from "../Structures/caver.js";
    import Trip from "../Structures/trip.js";

    function debug_msg(msg) {if($DEBUG)console.log(msg);}

    $: if($request_plan)
    {
        plan_trip();
        $request_plan = false;

    }

    function plan_trip()
    {
        var trips = {};
        var days_to_plan = $trip_settings["# of Seperate Trip Days"];
        var max_cavers = $trip_settings["Maximum # of Cavers"];

        function count_execs(){
            let count = 0;
            $cavers.forEach(caver => {
                if(caver.is_exec())
                    count+=1;
            });
            return count;
        }
        function count_seats(){
            let count = 0;
            $cavers.forEach(caver => {
                count+= caver.count_seats();
            });
            return count;
        }
        function count_full_trips_max(){
            count = 0;
            Object.values(trips).forEach(trp => {
                if (trp.is_full_max()){count+=1;}
            });
            return count;
        }
        function count_full_trips_seats(){
            console.log("method pass: count_full_trip_seats")
            let count = 0;
            Object.values(trips).forEach(trp => {
                if (trp.is_seats_full()){count+=1;}
            });
            return count;
        }

        function designate_caver(caver, forceday=null){

            if(forceday != null){
                trips[forceday].add_caver(caver);
                caver.set_designated(true);
                return;
            }

            let day_pref = caver.trip_day;
            if (day_pref == '' || day_pref == undefined && trips.length>1) { day_pref = $response_mappings["Either Day Response"];}
            //if trip day pref not applicable add them to day 1 (default)
            else if(day_pref=='' || day_pref == undefined) {
                // Object.values(trips)[0].add_caver(caver);
                //test
                let min_trip = Object.values(trips)[0];
                Object.values(trips).forEach(trip => {
                    if (trip.length < min_trip.length){
                        min_trip = trip;
                    }
                });
                min_trip.add_caver(caver);
            }
            //designate them to the trip with the least amount of people in it
            else if (day_pref == $response_mappings["Either Day Response"]){

                let min_trip = Object.values(trips)[0];
                Object.values(trips).forEach(trip => {
                    if (trip.length < min_trip.length){
                        min_trip = trip;
                    }
                });
                min_trip.add_caver(caver);
            }
            //designate them to the day they want
            else{
                console.log(day_pref);
                trips[day_pref].add_caver(caver);
            }

        }

        // let max_seats = count_seats();
        // let num_execs = count_execs();


        for(let i = 0; i < days_to_plan; i++)
        {
            let _trip_name = "";
            if ($response_mappings["Trip Day Preferences"][i] == undefined){
                _trip_name = `Day ${i+1}`;
                $response_mappings["Trip Day Preferences"][i] = _trip_name;
            }

            trips[$response_mappings["Trip Day Preferences"][i]] = new Trip(
                $response_mappings["Trip Day Preferences"][i], $trip_settings["Maximum # of Cavers"]
            )
        }
        debug_msg(`created trips!`);
        debug_msg(trips);

        // let admn = new Caver(999, "1/23/2023 17:06:04", "Joe", "Biden", "V00000", "jmama@gmail.com", "9491111111", "Obama", "Father",
        //                 "9490000000", "Yes", "No", "No", "Yes. It is sick 4x4 and you will be so excited.",
        //                 "5", "Wilderness first aid", false, "Saturday - Sept. 24, 2022");
        // trips["Saturday - Sept. 24, 2022"].add_caver(admn);

        console.log("doing first pass ...");
        //first pass: designate execs with cars that are 4x4s
        for(let i = 0; i < $cavers.length; i++){
            let caver = $cavers[i];
                if(caver.is_exec() && 
                    caver.get_vehicle_ans()==$response_mappings["Vehicle Capability Reponses"]["Offroad Capable"]){
                        designate_caver(caver);
                    }
        }
        console.log(`first pass done!`);
        debug_msg(trips);

        debug_msg("doing second pass ...");
        //second pass: designate the rest of the execs that have city cars
        for(let i = 0; i < $cavers.length; i++){
            let caver = $cavers[i];
                if(caver.is_exec() && !caver.is_designated() &&
                    caver.get_vehicle_ans()!=$response_mappings["Vehicle Capability Reponses"]["No Car"]){
                        designate_caver(caver);
                    }
        }  
        console.log(`second pass done!`);
        debug_msg(trips);

        console.log("doing third pass ...");

        //third pass: designate the remaining execs
        for(let i = 0; i < $cavers.length; i++){
            let caver = $cavers[i];
            if(caver.is_exec() && !caver.is_designated()){
                designate_caver(caver);
            }
        }  
        console.log(`third pass done!`);
        debug_msg(trips);

        //evaluate seats per trip. < max cavers?
        //yes- third pass: add drivers to each trip until seats >= max cavers, or end of list
        //no- skip third pass

        console.log("doing fourth pass (getting more drivers if needed)...");
        Object.values(trips).forEach(trip => {
            let i = 0;
            while(trip.get_seats()< max_cavers && i < $cavers.length){
                let caver = $cavers[i];
                if(!caver.is_designated() && (caver.get_pref_trip_day() == trip.day_name || caver.get_pref_trip_day() == $response_mappings["Either Day Response"]) && caver.get_vehicle_ans()!= $response_mappings["Vehicle Capability Reponses"]["No Car"]){
                    designate_caver(caver, trip.day_name);
                    //bypasses the "either" rotation to force someone who has no preference to join this trip
                }
                i+=1;
            }
        });
        console.log(`fourth pass done!`);
        debug_msg(trips);

        //now we should have a correct number of drivers, (contingent on availability of course)

        //evaluate empty spots per trip. (per trip: # seats - # cavers)
        //fifth pass: add non execs, non drivers, based on first come first serve (correlated w index in cavers list)
        console.log("doing fifth pass (filling remaining seats)...");

        // let i = 0;
        // while(i < $cavers.length && count_full_trips_seats() < Object.values(trips).length)//while we have open seats
        // {
        //     let caver = $cavers[i];
        //     if(!caver.is_designated()) //add by time
        //         {designate_caver(caver);}
        //     i+=1;
        //     console.log("running");
        // }
        //console.log($cavers.length);
        for(let i = 0; i < $cavers.length; i++)
        {
            let caver = $cavers[i];
            if (caver.is_designated() == false)
                {designate_caver(caver);}
            // if(!caver.is_designated()){
            //     designate_caver(caver);
            // }
        }
        console.log(`fifth pass done!`);
        debug_msg(trips);

        //both trips should now be as full as they can be capped first by driver avail, then by seat cap.

        //trim trips down. spaghet
        // Object.values(trips).forEach(trip=>{
        //     while(trip.get_num_cavers()>max_cavers){
        //         trip.pop();
        //     }
        // })


        //add trips to store
        $finished_trips = trips;
        debug_msg(`finished_trips store:`);
        debug_msg($finished_trips);
       

    }


</script>