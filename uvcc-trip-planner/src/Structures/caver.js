
class Caver {
    constructor(timestamp, firstname, lastname, vnumber, 
        phone, emergency_name, emergency_relation, emergency_phone, 
        med_ins_status, newcomer_cave_status, newcomer_ropes_status, 
        vehicle_owner_status, medi_cert_status, admin_status)
        {
            this.timestamp = timestamp;
            this.firstname = firstname;
            this.lastname = lastname;
            this.vnumber = vnumber;
            this.phone = phone;

            this.emergency_name = emergency_name;
            this.emergency_relation = emergency_relation;
            this.emergency_phone = emergency_phone;

            this.med_ins_status = med_ins_status;
            this.newcomer_cave_status = newcomer_cave_status;
            this.newcomer_ropes_status = newcomer_ropes_status;

            this.vehicle_owner_status = vehicle_owner_status;
            this.medi_cert_status = medi_cert_status;
            this.admin_status = admin_status;
        }
}