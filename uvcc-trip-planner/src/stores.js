import { readable, writable } from 'svelte/store';

const _debug = true;

export const DEBUG = readable(_debug);

export const request_plan = writable(false);

export const page = writable(0);

export const headers = writable([]);
export const cavers = writable([]);

export const finished_trips = writable([]);

export const column_mappings = writable({
	//note: these labels are used for lookup in Caver object
	//check TripManager,Caver.js after changing a label

	'Basic Info': {
		Timestamp: _debug ? 0 : null,
		'First Name': _debug ? 1 : null,
		'Last Name': _debug ? 2 : null,
		'UVic #': _debug ? 3 : null,
		Email: _debug ? 5 : null,
		Phone: _debug ? 6 : null
	},
	'Emergency Info': {
		Name: _debug ? 7 : null,
		Relation: _debug ? 8 : null,
		Phone: _debug ? 9 : null
	},
	Details: {
		'Med Insurance Status': _debug ? 10 : null,
		'Newcomer Status (Caves)': _debug ? 11 : null,
		'Newcomer Status (Ropes)': _debug ? 12 : null,
		'Vehicle Owner Status': _debug ? 13 : null,
		'Vehicle Seat Count': _debug ? 14 : null,
		'Med/Rescue Cert. Status': _debug ? 18 : null
	},
	Misc: {
		'Trip Day Pref (if applicable)': _debug ? 4 : null
	}
});

export const response_mappings = writable({
	//note: these labels are used for lookup in TripManager object
	//check TripManager.js after changing a label
	'Trip Day Preferences': _debug ? ["Saturday - Sept. 24, 2022","Sunday - Sept. 25, 2022"]:[],
	'Either Day Response': _debug ? 'Either day is fine!' : '',

	'Vehicle Capability Responses': {
		'Offroad Capable': 'Yes. It is sick 4x4 and you will be so excited.',
		'City Car': 'Yes, its a city car but it can still transport humans.',
		'No Car': 'Blah no.'
	}
});

export const trip_settings = writable({
	//note: these labels are used for lookup in TripManager object
	//check TripManager.js after changing a label
	'Maximum # of Cavers': 22,
	'# of Seperate Trip Days': 2,
	'Ropes Training Required?': false
});

export const exec_list = readable([
	'simon grieshaber-otto',
	'nathan inbar',
	'nikolay senilov',
	'anju otsu',
	'francis tran',
	'ryles forrest',
	'aline thévard',
	'avie waterfall',
	'lena fellenius',
	'amanda kervin',
	'wil munro',
	'alex sargent-laskin',
	'sara newman',
	'anna bartnik',
	'reece boulanger',
	'dmitri leo ros-ov',
	'jane buzath'
]);
