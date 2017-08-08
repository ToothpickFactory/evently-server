module.exports = function(event){
	// Title Validators
	if(!event.title){
		return Promise.reject("Title is required");
	}

	if(event.title.length > 32){
		return Promise.reject("Title length exceeds 32 chracters");
	}

	if(event.title.length < 4){
		return Promise.reject("Title length must be greater than 4 characters");
	}

	// Slots Validators
	if(!event.slots){
		return Promise.reject("An event must specifiy a number of available slots");
	}

	if(event.slots < 1){
		return Promise.reject("Slots for an event must be greater than 0");
	}

	if(event.slots > 1000){
		return Promise.reject("Max slots is 1000");
	}

	// Start Time Validators
	if(!event.startTime){
		return Promise.reject("An event must have a valid startTime");
	}

	if(event.startTime < Date.now()){
		return Promise.reject("An event's start time must be in the future");
	}

	let aYearFromNow = new Date();
	aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
	if(event.startTime > aYearFromNow.getTime()){
		return Promise.reject("An event's start time must be less than a year in advance");
	}

	return Promise.resolve(event);
}
