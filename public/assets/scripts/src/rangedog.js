import EventEmitter from "eventEmitter/EventEmitter";

const Rangedog = class Rangedog extends EventEmitter {
	
	constructor() {
		super();
		console.log("woof");
	}
}

export default Rangedog;