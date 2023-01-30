class Trip {
	constructor(day_name, max_cavers) {
		this.day_name = day_name;
		this.max_cavers = max_cavers;

		this.cavers = [];
		this.seats = 0;
	}

	add_caver(caver) {
		if (this.is_at_max_capacity()) {
			return;
		}

		this.cavers.push(caver);
		this.seats += caver.get_seats();
		caver.set_designated();
	}

	is_at_max_capacity() {
		return this.cavers.length >= this.max_cavers;
	}

	is_at_seats_capacity() {
		return (this.get_seats() - this.get_num_cavers()) <= 0;
	}

	has_enough_seats() {
		return (this.max_cavers - this.get_seats()) <= 0;
	}

	get_name() {
		return this.day_name;
	}

	get_seats() {
		return this.seats;
	}

	get_cavers() {
		return this.cavers;
	}

	get_num_cavers() {
		return this.cavers.length;
	}

	get_emails() {
		let emStr = '';

		for (const caver of this.cavers) {
            let email = caver.get_email();
			emStr += email;
            emStr += ',';
		}
		return emStr;
	}

	pop_caver() {
		let caver = this.cavers.pop();
		caver.set_designated(false);
	}
}

export default Trip;
