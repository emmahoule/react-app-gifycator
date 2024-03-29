var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: "./app",
        tests: "./app/tests"
    },
    output: {
        path: "dist",
        publicPath: "/assets/",
        filename: "[name].js"
    },
    resolve: {
    	extensions: ['','.js', '.jsx']
    },
    module: {
        loaders: [
            { 
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader" 
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            },
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract('style','css!autoprefixer?browsers=last 3 versions!sass')
            },
            {   test: /\.woff2$/, 
                loader: "url-loader?limit=10000&mimetype=application/font-woff2" 
            },
            {   test: /\.woff$/, 
                loader: "url-loader?limit=10000&mimetype=application/font-woff" 
            },
            {   test: /\.ttf$/,  
                loader: "url-loader?limit=10000&mimetype=application/octet-stream" 
            },
            {   test: /\.eot$/,  
                loader: "file-loader" 
            },
            {   test: /\.otf$/,  
                loader: "file-loader" 
            },
            {   test: /\.svg$/,  
                loader: "url-loader?limit=10000&mimetype=image/svg+xml" 
            }
        ]
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        contentBase: "./html/",
        historyApiFallback: true,
    },
    plugins: [
        new ExtractTextPlugin('app.css', {
            allChunks: true
        })
    ]
}
