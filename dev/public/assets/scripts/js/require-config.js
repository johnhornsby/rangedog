window.requireNode = window.require;
window.require = undefined;

requirejs.config({
	// baseUrl relative to html document that calls require
	baseUrl: "assets/scripts/dist",
	paths: {
		'eventie/eventie': '../../bower_components/eventie/eventie',
		unipointer: '../../bower_components/unipointer',
		unidragger: '../../bower_components/unidragger/unidragger',
		
		// eventEmitter: '../../bower_components/eventEmitter/EventEmitter',
		'eventEmitter/EventEmitter': '../../bower_components/eventEmitter/EventEmitter'
      	
	}
});

requirejs(['main']);
