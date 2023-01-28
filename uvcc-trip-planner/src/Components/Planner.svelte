<script>
    import {page, cavers, finished_trips, trip_settings, response_mappings, request_plan} from "../stores.js";
	import Caver from "../Structures/caver.js";
    import Trip from "../Structures/trip.js";

    $: if($request_plan)
    {
        plan_trip();
        $request_plan = false;

    }

    function plan_trip()
    {
        var trips = {};
        var arb_trip_i = 0; //arbitrary trip index. rotates when adding people who have no day pref
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
                if (trp.is_full_max(max_cavers)){count+=1;}
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
        function rotate_arb_trip(){
            //rotate to next non-full trip

            do{
                if (arb_trip_i == Object.values(trips).length-1)
                    arb_trip_i = 0;
                else
                    arb_trip_i +=1;
            }while(Object.values(trips)[arb_trip_i].is_full_max(max_cavers))

        }
        function designate_caver(caver, forceday=null){

            if(forceday != null){
                trips[forceday].add_caver(caver);
                caver.set_designated(true);
                return;
            }

            let day_pref = caver.trip_day;
            //if trip day pref not applicable add them to day 1 (default)
            if(!day_pref) {
                Object.values(trips)[0].add_caver(caver);
            }
            //designate them using the arbitrary trip indexer
            else if (day_pref == $response_mappings["Either Day Response"]){

                Object.values(trips)[arb_trip_i].add_caver(caver);
                rotate_arb_trip();
            }
            //designate them to the day they want
            else{

                trips[day_pref].add_caver(caver);
            }
            caver.set_designated(true);

        }

        let max_seats = count_seats();
        let num_execs = count_execs();


        for(let i = 0; i < days_to_plan; i++)
        {
            trips[$response_mappings["Trip Day Preferences"][i]] = new Trip(
                $response_mappings["Trip Day Preferences"][i]
            )
        }
        console.log(`created trips!`);
        console.log(trips);

        // let admn = new Caver(999, "1/23/2023 17:06:04", "Joe", "Biden", "V00000", "jmama@gmail.com", "9491111111", "Obama", "Father",
        //                 "9490000000", "Yes", "No", "No", "Yes. It is sick 4x4 and you will be so excited.",
        //                 "5", "Wilderness first aid", false, "Saturday - Sept. 24, 2022");
        // trips["Saturday - Sept. 24, 2022"].add_caver(admn);

        console.log("doing first pass ...");
        //first pass: designate execs with cars that are 4x4s
        for(let i = 0; i < $cavers.length; i++){
            let caver = $cavers[i];
            if(caver.is_exec()){
                if(caver.has_vehicle() && 
                    caver.get_vehicle_type()==$response_mappings["Vehicle Capability Reponses"]["Offroad Capable"]){
                        designate_caver(caver);
                    }
            }
        }
        console.log(`first pass done!`);
        console.log(trips);

        console.log("doing second pass ...");
        //second pass: designate the rest of the execs that have city cars
        for(let i = 0; i < $cavers.length; i++){
            let caver = $cavers[i];
            if(caver.is_exec()){
                if(caver.has_vehicle() && 
                    caver.get_vehicle_type()==$response_mappings["Vehicle Capability Reponses"]["City Car"]){
                        designate_caver(caver);
                    }
            }
        }  
        console.log(`second pass done!`);
        console.log(trips);

        console.log("doing third pass ...");

        //third pass: designate the remaining execs
        for(let i = 0; i < $cavers.length; i++){
            let caver = $cavers[i];
            if(caver.is_exec() && !caver.is_designated()){
                designate_caver(caver);
            }
        }  
        console.log(`third pass done!`);
        console.log(trips);

        //evaluate seats per trip. < max cavers?
        //yes- third pass: add drivers to each trip until seats >= max cavers, or end of list
        //no- skip third pass

        console.log("doing fourth pass (getting more drivers)...");
        Object.values(trips).forEach(trip => {
            let i = 0;
            while(trip.get_seats()<max_cavers && i < $cavers.length){
                let caver = $cavers[i];
                if(!caver.is_designated() && (caver.get_pref_trip_day() == trip.day_name || caver.get_pref_trip_day() == $response_mappings["Either Day Response"]) && caver.has_vehicle()!= $response_mappings["Vehicle Capability Reponses"]["No Car"]){
                    designate_caver(caver, trip.day_name);
                    //bypasses the "either" rotation to force someone who has no preference to join this trip
                }
                i+=1;
            }
        });
        console.log(`fourth pass done!`);
        console.log(trips);

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
        for(let i = 0; i < $cavers.length; i++)
        {
            let caver = $cavers[i];
            if(caver.is_designated()){continue;}

            let day_pref = caver.get_pref_trip_day();
            if (day_pref == $response_mappings["Either Day Response"]) //find next open trip for them if they have no pref
            {
                console.log(caver);
                for(let j = 0; j < Object.values(trips).length; j++){
                    let _trip = Object.values(trips)[j];
                    if(!_trip.is_seats_full()){
                        designate_caver(caver,_trip.day_name);
                    }
                }
            }
            else if(trips[day_pref] != null && trips[day_pref].is_seats_full()){//seats are full on their preferred day
                continue;//go to the next person
                // console.log(caver);
                // console.log(day_pref);
                // console.log(trips[day_pref]);
            }
            else if (trips[day_pref] != null && trips[day_pref].get_num_cavers()<= max_cavers){//preserves hard cap even if there are more seats
                designate_caver(caver);}
        }
        console.log(`fifth pass done!`);
        console.log(trips);

        //both trips should now be as full as they can be capped first by driver avail, then by seat cap.

        //trim trips down
        Object.values(trips).forEach(trip=>{
            while(trip.get_num_cavers()>max_cavers){
                trip.pop();
            }
        })


        //add trips to store
        $finished_trips = trips;
        console.log(`finished_trips store:`);
        console.log($finished_trips);
       

    }


</script>