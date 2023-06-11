const path = require('path');
const globule = require('globule');
const PugPlugin = require('pug-plugin');

const outputPath = path.join(__dirname, 'dist');

const viewTemplateFiles = {};
globule.find('src/app/pages/**/*.page.pug').forEach((filePath) => {
	const keyName = filePath.split(/\/|.page.pug/).splice(-2, 1)[0];

	Object.assign(viewTemplateFiles, {
		[keyName.toLowerCase()]: path.resolve(__dirname, filePath),
	});
});

module.exports = {
	entry: {
		...viewTemplateFiles,
	},

	output: {
		path: outputPath,
		publicPath: '',
		clean: true,
	},

	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'@': path.join(__dirname, 'src'),
			'@app': path.join(__dirname, 'src/app'),
			'@layouts': path.join(__dirname, 'src/app/layouts'),
			'@widgets': path.join(__dirname, 'src/app/widgets'),
			'@components': path.join(__dirname, 'src/app/components'),
			'@pages': path.join(__dirname, 'src/app/pages'),
			'@assets': path.join(__dirname, 'src/assets'),
			'@styles': path.join(__dirname, 'src/styles'),
		},
	},

	plugins: [
		new PugPlugin({
			css: {
				filename: (pathData) => {
					return 'css/[name].[contenthash:8].css';
				},
			},
			js: {
				filename: 'js/[name].[contenthash:8].js',
			},
		}),
	],

	module: {
		rules: [
			{
				test: /.pug$/,
				loader: PugPlugin.loader,
			},

			{
				test: /\.(png|svg|jpe?g|gif|webp|ico)$/i,
				type: 'asset/resource',
				include: /img/,
				resourceQuery: { not: [/inline/] }, // ignore images with `?inline` query
				generator: {
					filename: (pathData) => {
						return path
							.join(path.dirname(pathData.filename).replace('src/', ''), '[name][ext][query]')
							.replace(/\\/g, '/');
					},
					// example how to generate dynamic filename
					// filename: (pathData) => (pathData.filename.endsWith('favicon.ico') ? 'favicon.ico' : filename),
				},
			},

			{
				test: /\.(png|jpe?g|webp)/,
				type: 'asset/resource',
				// ==> You can't load an image file in the JS using the 'responsive-loader'.
				// ==> DISABLE 'responsive-loader', then the image can be used in JS
				// use: {
				// 	loader: 'responsive-loader',
				// 	options: {
				// 		// output filename of images
				// 		name: 'assets/img/[name].[hash:8]-[width]w.[ext]',
				// 	},
				// },
				generator: {
					filename:  'assets/img/[name].[hash:8].[ext]',
					// filename: (pathData) => {
					// 	return path
					// 		.join(path.dirname(pathData.filename).replace('src/', ''), '[name][ext][query]')
					// 		.replace(/\\/g, '/');
					// },
					// example how to generate dynamic filename
					// filename: (pathData) => (pathData.filename.endsWith('favicon.ico') ? 'favicon.ico' : filename),
				},
			},

			{
				test: /\.(svg)$/i,
				type: 'asset/inline',
				resourceQuery: /inline/,
			},

			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /(node_modules|bower_components)/,
			},

			{
				test: /\.(tsx|ts)$/,
				use: ['ts-loader'],
				exclude: /(node_modules|bower_components)/,
			},

			{
				test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
				type: 'asset/resource',
				include: /fonts|node_modules/, // fonts from `assets/fonts` or `node_modules` directory only
				generator: {
					filename: (pathData) => {
						return path
							.join(path.dirname(pathData.filename).replace('src/', ''), '[name][ext][query]')
							.replace(/\\/g, '/');
					},
				},
			},
		],
	},
};
