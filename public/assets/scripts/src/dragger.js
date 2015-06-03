import Unidragger from "unidragger"


export default class Dragger extends Unidragger {
	
	constructor(elem) {
		super();
		this.handles = null;
		this.element = elem;
	}

	create() {
		this.handles = [ this.element ];
  		this.bindHandles();
	}

	dragStart(event, pointer) {
		console.log('drag start');
	}

	dragMove( event, pointer, moveVector ) {
	  var dragX = this.dragStartPoint.x + moveVector.x;
	  var dragY = this.dragStartPoint.y + moveVector.y;
	  // this.element.style.left = dragX + 'px';
	  // this.element.style.top = dragY + 'px';
	};

	dragEnd( event, pointer ) {
	  console.log('drag end');
	};
}