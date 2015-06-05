import Unidragger from "unidragger"


export default class Dragger extends Unidragger {
	

	constructor(elem) {
		super();
		
		this._element = elem;
		this._last = 0; 
		this._modifier = 0.25;
		this._isDragging = false;
	}


	create() {
		this.handles = [ this._element ];
  		this.bindHandles();
	}


	dragStart(event, pointer) {
		console.log("dragStart");
		this._last = 0;
		this._isDragging = true;
		this.emit("dragStart");
	}


	dragMove( event, pointer, moveVector ) {
	  
	  const x = this._modifier * moveVector.x;

	  const delta = x - this._last;

	  this._last = x;

	  this.emit("dragMove", delta);
	}


	dragEnd( event, pointer ) {
	  this._isDragging = false;
	  console.log("dragEnd");
	  this.emit("dragEnd");
	}

	pointerDone(event, pointer) {
		if (this._isDragging === true) {
			return;
		}
		//console.log(`pointerDone x:${this.pointerDownPoint.x} y:${this.pointerDownPoint.y}`);
	}
}