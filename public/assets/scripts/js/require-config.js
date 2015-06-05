window.requireNode = window.require;
window.require = undefined;

requirejs.config({
	// baseUrl relative to html document that calls require
	baseUrl: "assets/scripts/dist",
	paths: {
		almond: '../../bower_components/almond/almond',
		eventie: '../../bower_components/eventie',
		unipointer: '../../bower_components/unipointer',
		unidragger: '../../bower_components/unidragger/unidragger',
		eventEmitter: '../../bower_components/eventEmitter'
	}
});

requirejs(['main']);
