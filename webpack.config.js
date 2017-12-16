var path = require('path');

var BUILD_PATH = path.resolve(__dirname, 'dist');
var APP_PATH = path.resolve(__dirname, 'src');

var config = {
	entry: APP_PATH + '/App.js',
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
				  presets: ['es2015', 'stage-0', 'react']
				}
			}
		]
	}
};

module.exports = config;