const path = require('path');

var config = {
	entry: './index.js',
	output: {
		path: path.join(__dirname, "build/"),
		publicPath: "/",
		filename: "index.js"
  },
	devServer: {
		inline: true,
		port: 5000
	},
    module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					plugins: ["transform-decorators-legacy", "transform-class-properties", "transform-object-rest-spread"],
					presets: ['es2015', 'react']
				}
			}
		]
	}
}

module.exports = config;
