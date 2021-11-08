const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

const webconfig= {
//      entry: __dirname + "/src/main.js", //单文件
		entry:{//多文件
			'main':'./chat/js/chat.js',
		},
        output: {
            path: path.resolve(__dirname,'./chat/js'),
            filename: "[name].build.js",
        },
        devtool: 'false',//eval-source-map
        devServer: {
            contentBase: "./dist", //本地服务器所加载的页面所在的目录
            historyApiFallback: true, //不跳转
            inline: true,
            port:6666,
            noInfo: true
        },
        module: {
	   	     rules: [
	   	     	 {
					 test: require.resolve('jquery'),
			         use: [{
			              loader: 'expose-loader',
			              options: 'jQuery'
			          },{
			              loader: 'expose-loader',
			              options: '$'
			          }]
				},
	            {
	                test: /\.js$/,
	                use: {
	                    loader: "babel-loader"
	                },
	                exclude: /node_modules/
	            },
	            {
	                test: /\.css$/,
	                use: ["style-loader","css-loader",
	                 	{
	                        loader: "postcss-loader",
	                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
					                plugins: () => [
//					                 	require('postcss-import')(), 
					                    require('autoprefixer')(), //CSS浏览器兼容
					                ]
				            }
	                    }
	                ],
	            },
	             { //图片
	            	test:/\.(png|jpg|gif|svg)$/,
	            	use:[
	            		{	
	            			//loader: 'url-loader?limit=8192&name=./img/[hashs:8].[name].[ext]" //带hash8位输出
	            			loader: 'url-loader',//小于8k采用base64 否则带原有名字输出到目录
	            			options:{
	            				limit:8192,
	            				name:'img/[name].[hash].[ext]'
	            			}
	            		},
	            	]
	            }
	        
	        ]
	    },
	 

};

module.exports=webconfig;
