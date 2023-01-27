
class Trip
{
    constructor(day_name)
    {
        this.day_name = day_name;
        this.cavers = [];
        this.seats = 0;
    }

    add_caver(caver)
    {
        const regex_yes = /yes/i;
        this.cavers.push(caver);

        if(regex_yes.test(caver.vehicle_owner_status))
                this.seats+=parseInt(caver.vehicle_seat_count);
    }
}

export default Trip;