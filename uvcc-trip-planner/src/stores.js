import {writable} from 'svelte/store';

export const page = writable(0);

export const headers = writable([]);
export const caver_names = writable([]);

export const column_mappings = writable({

    "Basic Info":
    {
        "Timestamp" : null,
        "First Names" : null,
        "Last Names" : null,
        "UVic #" : null,
        "Email" : null,
    },

    "Details":
    {
        "Med Insurance Status" : null,
        "Newcomer Status (Caves)" : null,
        "Newcomer Status (Ropes)" : null,
        "Vehicle Owner Status" : null,
        "Med/Rescue Cert. Status" : null,
    }

});
    