const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
	resolve: {
		alias: {
			'@backend': path.resolve(__dirname, '../backend'),
			'@root': process.cwd(),
			'@styles': `${process.cwd()}/styles`,
			'@utils': `${process.cwd()}/js/utils`,
			'@modules': `${process.cwd()}/js/modules`
		}
	},
	optimization : {
		minimizer: [
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: { removeAll: true },
						}
					]
				}
			}),
			(compiler) => {
				const TerserPlugin = require('terser-webpack-plugin');
				new TerserPlugin({
				  terserOptions: {
					compress: {},
				  }
				}).apply(compiler);
			}
		],
		splitChunks: {
			chunks: 'async',
			minSize: 20000,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			enforceSizeThreshold: 50000,
			cacheGroups: {
			  defaultVendors: {
				test: /[\\/]node_modules[\\/]/,
				priority: -10,
				reuseExistingChunk: true
			  },
			  default: {
				minChunks: 2,
				priority: -20,
				reuseExistingChunk: true
			  }
			}
		},
		usedExports: true,
		sideEffects: true
	},
	devtool: !isProduction ? 'inline-source-map' : false,
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/,
				type: 'asset',
				parser: {
					// Conditions for converting to base64
					dataUrlCondition: {
						maxSize: 25 * 1024, // 25kb
					}
				},
				generator: {
					filename: 'images/[contenthash][ext][query]',
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
				  loader: 'babel-loader'
				}
			}
		]
	},
	output: {
		// publicPath: '../backend/catalog/static',
		filename: isProduction ? '[name].[contenthash].js' : 'index.js',
		clean: true,
		chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].bundle.js'
	}
};
