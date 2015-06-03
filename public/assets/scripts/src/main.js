// Bower Modules
import require from "require";
import $ from "jquery";
import Unidragger from "unidragger";

// App Modules
import Rangedog from "./rangedog";
import Dragger from "./dragger";



class Main {

	constructor() {
		this._rangedog = null;

		this._init();
	}


	_init() {
		const elem = document.getElementsByClassName('range')[0];
		this._dragger = new Dragger(elem);
		this._dragger.create();
		this._rangedog = new Rangedog();


	}
}

new Main();