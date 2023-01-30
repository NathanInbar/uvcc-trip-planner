<script>
	import {
		DEBUG,
		cavers,
		finished_trips,
		trip_settings,
		response_mappings,
		request_plan
	} from '../stores.js';
	import Caver from '../Structures/Caver.js';
	import Trip from '../Structures/Trip.js';
	import TripManager from '../Structures/TripManager.js';

	function debug_msg(msg) {
		if ($DEBUG) console.log(msg);
	}

	$: if ($request_plan) {
		plan_trip();
		$request_plan = false;
	}

	function plan_trip() {
		// DEBUG caver :
		// let admn = new Caver(999, "1/23/2023 17:06:04", "Joe", "Biden", "V00000", "jmama@gmail.com", "9491111111", "Obama", "Father",
		//                 "9490000000", "Yes", "No", "No", "Yes. It is sick 4x4 and you will be so excited.",
		//                 "5", "Wilderness first aid", false, "Saturday - Sept. 24, 2022");

		let manager = new TripManager();

		console.log('doing first pass ...');
		//first pass: designate execs with cars that are 4x4s
		for (let i = 0; i < $cavers.length; i++) {
			let caver = $cavers[i];

			if (caver.is_exec() && caver.has_offroad()) {
				manager.designate_caver(caver);
			}
		}
		console.log(`first pass done!`);
		manager.print_trips();

		debug_msg('doing second pass ...');
		//second pass: designate the rest of the execs that have city cars
		for (let i = 0; i < $cavers.length; i++) {
			let caver = $cavers[i];

			if (caver.is_exec() && !caver.is_designated() && caver.has_vehicle()) {
				manager.designate_caver(caver);
			}
		}
		console.log(`second pass done!`);
		manager.print_trips();

		console.log('doing third pass ...');
		//third pass: designate the remaining execs
		for (let i = 0; i < $cavers.length; i++) {
			let caver = $cavers[i];

			if (caver.is_exec() && !caver.is_designated()) {
				manager.designate_caver(caver);
			}
		}
		console.log(`third pass done!`);
		manager.print_trips();

		console.log('doing fourth pass (getting more drivers if needed)...');
		//evaluate seats per trip. seats < max cavers?
		//yes- fourth pass: add drivers to each trip until seats >= max cavers, or end of list
		//no- skip
		for (const trip of manager.get_trips()) {
			for (let i = 0; !trip.has_enough_seats() && i < $cavers.length; i++) {
				let caver = $cavers[i];
				if (
					!caver.is_designated() &&
					(caver.get_pref_trip_day() == trip.get_name() || caver.has_no_day_preference()) &&
					caver.has_vehicle()
				) {
					//bypasses the manager to force someone who has no preference to join this trip
					//note: also bypasses ropes training requirement to fill drivers
					trip.add_caver(caver);
				}
			}
		}
		console.log(`fourth pass done!`);
		manager.print_trips();

		//fifth pass: add based on first come first serve (correlated w index in cavers list)
		console.log('doing fifth pass (filling remaining seats)...');
		for (let i = 0; i < $cavers.length; i++) {
			let caver = $cavers[i];

			if (caver.is_designated() == false) {
				manager.designate_caver(caver);
			}
		}
		console.log(`fifth pass done!`);
		manager.print_trips();

		//add trips to store
		$finished_trips = manager.get_trips();
		debug_msg(`finished_trips store:`);
		debug_msg($finished_trips);
	}
</script>
