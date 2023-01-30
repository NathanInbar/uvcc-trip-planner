import { get } from 'svelte/store';
import {DEBUG, trip_settings, response_mappings} from '../stores';
import Trip from './trip';

class TripManager {
    constructor(){

		let _trip_settings = get(trip_settings);

        this.num_trips = _trip_settings["# of Seperate Trip Days"];
		if (this.num_trips < 0) {this.num_trips = 1;}
        this.max_cavers = _trip_settings["Maximum # of Cavers"];
		this.req_ropes = _trip_settings["Ropes Training Required?"];

        this.trips = [];
        
        // - - 
        this._make_trips();
    }

    _make_trips(){
		let day_prefs = get(response_mappings)["Trip Day Preferences"];

        for(let i = 0; i < this.num_trips; i++){
            
			let _day_name = `Day ${i}`;
			if(day_prefs[i] != undefined || day_prefs[i] != null){
				_day_name = day_prefs[i];
			}

            this.trips.push(new Trip(_day_name, this.max_cavers))
        }
    }

	get_min_trip(){
		//gets trip with least amount of people in it
		let min_trip = this.trips[0];
		for(const trip of this.trips){
			if(trip.length < min_trip.length){
				min_trip = trip;
			}
		}
		return min_trip;
	}

	get_trip_by_name(name){
		//returns a Trip if one with name is found, else null.
		let target_trip = null;
		for(let trip of this.trips){
			if(name == trip.get_name()){
				target_trip = trip; 
				return target_trip;
			}
		}
		console.log("invalid day name");
		return target_trip;
	}

    designate_caver(caver){
		//if we only have 1 trip, put them in it
		if(this.trips.length==1) {this.trips[0].add_caver(caver); return;}

		let either_response = get(response_mappings)["Either Day Response"];

		let caver_day_pref = caver.get_info("Trip Day Pref (if applicable)");
		//if we have >1 trip, then inspect preference
		if( caver_day_pref == either_response){
			this.get_min_trip().add_caver(caver);
		}
		else{
			let preferred_trip = this.get_trip_by_name(caver_day_pref);
			if(preferred_trip == null || preferred_trip == undefined){return;}

			preferred_trip.add_caver(caver);
		}
    }

	get_trips(){return this.trips;}

	print_trips(){
		if(get(DEBUG))
			console.log(this.trips);
	}

}

export default TripManager;