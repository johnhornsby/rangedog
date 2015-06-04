import Unidragger from "unidragger"


export default class Dragger extends Unidragger {
	
	constructor(elem) {
		super();
		this.handles = null;
		this.element = elem;
		this.last = 0; 
	}

	create() {
		this.handles = [ this.element ];
  		this.bindHandles();
	}

	dragStart(event, pointer) {
		console.log('drag start');
	}

	dragMove( event, pointer, moveVector ) {
	  // var dragX = this.dragStartPoint.x + moveVector.x;

	  const delta = moveVector.x - this.last;

	  this.last = moveVector.x;

	  this.emit("dragMove", delta);
	};

	dragEnd( event, pointer ) {
	  console.log('drag end');
	};
}