import {readable,writable} from 'svelte/store';

export const DEBUG = readable(true);

export const request_plan = writable(false);

export const page = writable(0);

export const headers = writable([]);
export const cavers = writable([]);

export const finished_trips = writable({});

export const column_mappings = writable({

    "Basic Info":
    {
        "Timestamp" : 0,
        "First Name" : 1,
        "Last Name" : 2,
        "UVic #" : 3,
        "Email" : 5,
        "Phone" : 6,
    },
    "Emergency Info":
    {
        "Name" : 7,
        "Relation" : 8,
        "Phone" : 9,

    },
    "Details":
    {
        "Med Insurance Status" : 10,
        "Newcomer Status (Caves)" : 11,
        "Newcomer Status (Ropes)" : 12,
        "Vehicle Owner Status" : 13,
        "Vehicle Seat Count" : 14,
        "Med/Rescue Cert. Status" : 18,
    },
    "Misc":
    {
        "Trip Day Pref (if applicable)" : null,
    }

});
    
export const response_mappings = writable({

    "Trip Day Preferences" : [],
    "Either Day Response": "",

    "Vehicle Capability Reponses": {
        "Offroad Capable": "Yes. It is sick 4x4 and you will be so excited.",
        "City Car": "Yes, its a city car but it can still transport humans.",
        "No Car": "Blah no.",
    }
    

})

export const trip_settings = writable({
    "Maximum # of Cavers": 20,
    "# of Seperate Trip Days": 1,
    //"Ropes Training Required?": false,
})

export const exec_list = readable(
    [
        "simon grieshaber-otto",
        "nathan inbar",
        "nikolay senilov",
        "anju otsu",
        "francis tran",
        "ryles forrest",
        "aline thévard",
        "avie waterfall",
        "lena fellenius",
        "amanda kervin",
        "wil munro",
        "alex sargent-laskin",
        "sara newman",
        "anna bartnik",
        "reece boulanger",
        "dmitri leo ros-ov",
        "jane buzath",
    ]
)

