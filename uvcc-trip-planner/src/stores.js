import {readable,writable} from 'svelte/store';

export const request_plan = false;

export const page = writable(0);

export const headers = writable([]);
export const cavers = writable([]);

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
        "Med/Rescue Cert. Status" : null,
    },
    "Misc":
    {
        "Trip Day (if applicable)" : null,
    }

});
    
export const trip_settings = writable({
    "Maximum # of Cavers": null,

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

