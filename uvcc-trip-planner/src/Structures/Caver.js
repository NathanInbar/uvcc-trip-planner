import { get } from 'svelte/store';
import { DEBUG, response_mappings } from '../stores';

class Caver {
	constructor(id, exec_status, info) {
		this.id = id;
		this.exec_status = exec_status;
		this.info = info;
		this.designated = false; //whether this caver has been designated to a trip

		this.sanitize_info();
	}

	get_info(label) {
		return this.info[label];
	}
	set_info(label, value) {
		this.info[label] = value;
	}

	sanitize_info() {
		//sanitize seat count => parse as int
		let seat_count = this.info['Vehicle Seat Count'];
		seat_count = seat_count.replace(/\D/g, ''); //get only numbers from string
		if (seat_count == '')
			//check empty (no numbers entered).
			seat_count = 0;
		else seat_count = parseInt(seat_count);

		this.set_info('Vehicle Seat Count', seat_count);

		//sanitize trip day
		let trip_day = this.info['Trip Day Pref (if applicable)'];
		if (trip_day != null || trip_day != undefined) {
			this.set_info('Trip Day Pref (if applicable)', trip_day.replace(/['"]+/g, '')); //remove quotes added by CSV due to comma in date
		} else {
			let either_response = get(response_mappings)['Either Day Response'];
			this.set_info('Trip Day Pref (if applicable)', either_response);
		}
	}

	is_exec() {
		return this.exec_status;
	}
	set_exec(truthy = true) {
		this.exec_status = truthy;
	}
	is_designated() {
		return this.designated;
	}
	set_designated(truthy = true) {
		this.designated = truthy;
	}
	get_name() {
		return `${this.info['First Name']} ${this.info['Last Name']}`;
	}
	get_email() {
		return this.info['Email'];
	}
	get_seats() {
		return this.info['Vehicle Seat Count'];
	}
	// - - -
	get_vehicle_ans() {
		return this.info['Vehicle Owner Status'];
	}
	has_vehicle() {
		let vehicle_ans = this.get_vehicle_ans();
		let no_car_response = get(response_mappings)['Vehicle Capability Responses']['No Car'];

		return vehicle_ans != no_car_response;
	}
	has_offroad() {
		if (!this.has_vehicle()) {
			return false;
		}

		let vehicle_ans = this.get_vehicle_ans();
		let offroad_reponse = get(response_mappings)['Vehicle Capability Responses']['Offroad Capable'];
		return vehicle_ans == offroad_reponse;
	}
	has_no_day_preference() {
		let either_response = get(response_mappings)['Either Day Response'];
		return this.info['Trip Day Pref (if applicable)'] == either_response;
	}
	get_pref_trip_day() {
		return this.info['Trip Day Pref (if applicable)'];
	}
	has_ropes_exp() {
		return this.info['Newcomer Status (Ropes)'].toLowerCase() == "yes"
	}
}
export default Caver;
