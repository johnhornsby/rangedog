// Bower Modules
import require from "require";
import $ from "jquery";
import Unidragger from "unidragger";

import {extend, sum} from "utils";
// App Modules
// import Rangedog from "./rangedog";
import Dragger from "./dragger";



class Main {

	constructor() {
		this._rangedog = null;
		this._init();
		console.log(sum[1,2,3]);
	}


	_init() {
		const elem = document.getElementsByClassName('range')[0];
		this._dragger = new Dragger(elem);
		this._dragger.create();

		const options = {
			length: 180,
			start: 0,
			wrap: true,
			inertia: true,
			update: this._onRangeUpdate.bind(this)
		}
		// this._rangedog = new Rangedog(options);

		this._dragger.on('dragMove', this._onDragMove.bind(this));

		$('.range__next').on('click', this._onNextClick.bind(this));
	}

	_onNextClick() {
		// this._rangedog.slideTo(90);
	}

	_onRangeUpdate(x) {
		console.log(x);
	}

	_onDragMove(deltaX) {
		// console.log(deltaX);
		// this._rangedog.increment(deltaX);
	}
}

new Main();