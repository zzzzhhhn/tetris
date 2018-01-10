module.exports = {
    entry: {
        main: './src/ts/main.ts'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    },
                   'ts-loader'
                ],
                exclude: '/node_modules'
            }
        ]
    }

}