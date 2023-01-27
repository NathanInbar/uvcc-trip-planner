import {writable} from 'svelte/store';

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
    