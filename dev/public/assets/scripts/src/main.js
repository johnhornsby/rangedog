// Bower Modules
import require from "require";

// App Modules
import Rangedog from "rangedog/rangedog";
import Dragger from "dragger";




class Main {

	constructor() {
		this._rangedog = null;
		this._content = null;
		this._init();
	}


	_init() {
		const elem = document.getElementsByClassName('range')[0];
		this._dragger = new Dragger(elem);
		this._dragger.activate();

		const options = {
			length: 180,
			wrap: true,
			inertia: true,
			rounded: true
		}
		this._rangedog = new Rangedog(options);
		this._rangedog.on(Rangedog.RANGEDOG_EVENT_UPDATE, this._onRangeUpdate.bind(this));
		this._rangedog.on(Rangedog.RANGEDOG_EVENT_INERTIA_COMPLETE, this._onRangeInertiaComplete.bind(this));
		this._rangedog.on(Rangedog.RANGEDOG_EVENT_INERTIA_NONE, this._onRangeInertiaNone.bind(this));
		this._rangedog.on(Rangedog.RANGEDOG_EVENT_INERTIA_START, this._onRangeInertiaStart.bind(this));
		this._rangedog.on(Rangedog.RANGEDOG_EVENT_SLIDE_TO_COMPLETE, this._onRangeSlideToComplete.bind(this));

		this._dragger.on('dragStart', this._onDragStart.bind(this));
		this._dragger.on('dragMove', this._onDragMove.bind(this));
		this._dragger.on('dragEnd', this._onDragEnd.bind(this));
		this._dragger.on('pointerDone', this._onPointerDone.bind(this));

		const nextButton = document.getElementsByClassName('range__next')[0];
		const prevButton = document.getElementsByClassName('range__previous')[0];
		nextButton.addEventListener('click', this._onNextClick.bind(this));
		prevButton.addEventListener('click', this._onPreviousClick.bind(this));

		this._content = document.getElementsByClassName('range__content')[0];

	}


	_onNextClick() {
		this._rangedog.slideTo(this._rangedog.index - 50, 0.05);
	}


	_onPreviousClick() {
		this._rangedog.slideTo(45, 0.33);
	}


	_onRangeUpdate(x) {
		// console.log(`_onRangeUpdate ${x}`);
		x *= -100;
		this._content.style.transform = `translate3d(${x}%, 0, 0)`;
	}

	_onRangeInertiaComplete() {
		console.log("_onRangeInertiaComplete");
	}

	_onRangeInertiaNone() {
		console.log("_onRangeInertiaNone");
	}

	_onRangeInertiaStart() {
		console.log("_onRangeInertiaStart");
	}

	_onRangeSlideToComplete() {
		console.log("_onRangeSlideToComplete");
	}



	_onDragMove(deltaX) {
		console.log(deltaX);
		this._rangedog.increment(deltaX);
	}

	_onDragStart() {
		console.log("_onDragStart");
	}

	_onPointerDone() {
		console.log("_onPointerDone");
	}


	_onDragEnd() {
		this._rangedog.activateInertiaIfAny();
	}
}

new Main();