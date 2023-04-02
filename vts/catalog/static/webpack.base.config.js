const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	resolve: {
		alias: {
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
	},
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
			}
		]
	},
	output: {
		filename: '[name].[contenthash].js',
		clean: true
	}
};