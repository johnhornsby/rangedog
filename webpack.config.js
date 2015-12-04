module.exports = {
	entry: "./src/RangeDog.js",
	output: {
		libraryTarget: "umd",
		path: __dirname + "/dist",
		filename: "range-dog.js"
	},
	module: {
	  loaders: [
	    {
	      test: /\.js?$/,
	      exclude: /(dist|lib|node_modules)/,
	      loader: 'babel-loader'
	    }
	  ]
	}
}