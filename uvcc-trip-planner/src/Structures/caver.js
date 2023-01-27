
class Caver {
    constructor(id,timestamp, firstname, lastname, vnumber, email, 
        phone, emergency_name, emergency_relation, emergency_phone, 
        med_ins_status, newcomer_cave_status, newcomer_ropes_status, 
        vehicle_owner_status, vehicle_seat_count, medi_cert_status, exec_status, trip_day=null)
        {
            this.id=id;
            this.timestamp = timestamp;
            this.firstname = firstname;
            this.lastname = lastname;
            this.vnumber = vnumber;
            this.email = email;
            this.phone = phone;

            this.emergency_name = emergency_name;
            this.emergency_relation = emergency_relation;
            this.emergency_phone = emergency_phone;

            this.med_ins_status = med_ins_status;
            this.newcomer_cave_status = newcomer_cave_status;
            this.newcomer_ropes_status = newcomer_ropes_status;

            this.vehicle_owner_status = vehicle_owner_status;
            this.vehicle_seat_count = vehicle_seat_count;
            this.medi_cert_status = medi_cert_status;
            this.exec_status = exec_status;

            this.trip_day= trip_day; //preferred trip day if trip has multiple day options
        }
}
export default Caver;