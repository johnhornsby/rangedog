// Bower Modules
import require from "require";
import $ from "jquery";
import Unidragger from "unidragger";

// App Modules
import Rangedog from "./rangedog";



class Main {

	constructor() {
		this._rangedog = null;

		this._init();
	}


	_init() {
		this._rangedog = new Rangedog();
	}
}

new Main();