import Unidragger from "unidragger"


export default class Dragger extends Unidragger {
	

	constructor(elem) {
		super();
		
		this.handles = null;
		this.element = elem;
		this.last = 0; 
		this.modifier = 0.25;
	}


	create() {
		this.handles = [ this.element ];
  		this.bindHandles();
	}


	dragStart(event, pointer) {
		this.emit("dragStart");
	}


	dragMove( event, pointer, moveVector ) {
	  
	  const x = this.modifier * moveVector.x;

	  const delta = x - this.last;

	  this.last = x;

	  this.emit("dragMove", delta);
	}


	dragEnd( event, pointer ) {
	  this.emit("dragEnd");
	}
}