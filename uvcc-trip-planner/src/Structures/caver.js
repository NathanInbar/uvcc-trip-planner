
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

            this.trip_day= trip_day.replace(/['"]+/g, ''); //preferred trip day if trip has multiple day options
            // - - -
            //whether this caver has been designated on a trip
            this.designated = false;

            this.sanitize_seat_count();
        }

    sanitize_seat_count(){
        //get only numbers from string
        this.vehicle_seat_count = this.vehicle_seat_count.replace(/\D/g, "");
        //check empty (no numbers entered).
        if(this.vehicle_seat_count == '')
            this.vehicle_seat_count=0;
        else
            this.vehicle_seat_count=parseInt(this.vehicle_seat_count);
    }
     // --   
    is_exec(){return this.exec_status;}
    is_designated(){return this.designated;}
    set_designated(truthy){this.designated=truthy;}
    has_vehicle(){
        return this.vehicle_owner_status;}
    has_cave_exp(){return this.newcomer_cave_status;}
    has_ropes_exp(){return this.newcomer_ropes_status;}
    get_signup_time(){return this.timestamp;}
    get_email() {return this.email;}

    count_seats(){
        if (!this.has_vehicle()) return 0;
        return this.vehicle_seat_count;
    }

    get_vehicle_type(){
        if(!this.has_vehicle()) return null;
        return this.vehicle_type;
    }

    get_pref_trip_day(){
        return this.trip_day;
    }

}
export default Caver;