
class Trip
{
    constructor(day_name)
    {
        this.day_name = day_name;
        this.cavers = [];
        this.seats = 0;
    }

    add_caver(caver){
        this.cavers.push(caver);
        this.seats += caver.count_seats();
    }

    is_full_max(max_cavers){
        if (this.cavers.length>=max_cavers)
            return true;
        return false;
    }
    is_seats_full(){
        return this.seats - this.cavers.length <= 0
    }
    get_seats(){return this.seats;}

    get_cavers(){return this.cavers;}

    get_num_cavers(){return this.cavers.length;}
}

export default Trip;