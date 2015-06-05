requirejs.config({
	// baseUrl relative to html document that calls require
	baseUrl: "assets/scripts/dist",
	name: "main",
	paths: {
		almond: '../../bower_components/almond/almond',
		eventie: '../../bower_components/eventie',
		unipointer: '../../bower_components/unipointer',
		unidragger: '../../bower_components/unidragger/unidragger',
		eventEmitter: '../../bower_components/eventEmitter',

	},
	//required for Almond to insert the root call to main.js in the baseUrl
	insertRequire: ['main'],
	optimize: "uglify"
	// wrap: {
 //        startFile: 'path/to/start.frag',
 //        endFile: 'path/to/end.frag'
 //    }
});