const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	resolve: {
		alias: {
			'@root': process.cwd()
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
			})
		],
	},
};