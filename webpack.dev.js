const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const outputPath = path.join(__dirname, 'dist');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'source-map',

	devServer: {
		static: {
			directory: outputPath,
			watch: true,
		},
		devMiddleware: {
			writeToDisk: true,
		},
		hot: true,
		compress: true,
		port: 4747,
	},

	watchOptions: {
		ignored: ['**/node_modules'],
	},

	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: ['css-loader', 'postcss-loader', 'sass-loader'],
			},
		],
	},
});
