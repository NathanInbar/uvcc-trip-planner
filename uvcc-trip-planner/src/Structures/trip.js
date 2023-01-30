
class Trip
{
    constructor(day_name,max_cavers)
    {
        this.day_name = day_name;
        this.cavers = [];
        this.max_cavers = max_cavers;
        this.seats = 0;
    }

    add_caver(caver){
        if (this.is_full_max()) {return;}
        this.cavers.push(caver);
        this.seats += caver.count_seats();
        caver.set_designated(true);
    }

    is_full_max(){
        if (this.cavers.length>=this.max_cavers)
            return true;
        return false;
    }
    is_seats_full(){
        return this.seats - this.cavers.length <= 0
    }
    get_seats(){return this.seats;}

    get_cavers(){return this.cavers;}

    get_num_cavers(){return this.cavers.length;}

    pop(){
        let caver = this.cavers.pop();
        caver.designated = false;
    }
}

export default Trip;