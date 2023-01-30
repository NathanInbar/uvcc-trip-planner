import {readable,writable} from 'svelte/store';

export const DEBUG = readable(false);

export const request_plan = writable(false);

export const page = writable(0);

export const headers = writable([]);
export const cavers = writable([]);

export const finished_trips = writable({});

export const column_mappings = writable({

    "Basic Info":
    {
        "Timestamp" : null,
        "First Name" : null,
        "Last Name" : null,
        "UVic #" : null,
        "Email" : null,
        "Phone" : null,
    },
    "Emergency Info":
    {
        "Name" : null,
        "Relation" : null,
        "Phone" : null,

    },
    "Details":
    {
        "Med Insurance Status" : null,
        "Newcomer Status (Caves)" : null,
        "Newcomer Status (Ropes)" : null,
        "Vehicle Owner Status" : null,
        "Vehicle Seat Count" : null,
        "Med/Rescue Cert. Status" : null,
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

