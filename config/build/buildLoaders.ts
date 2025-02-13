import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.module\.css$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes(".module.")),
                        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
                    },
                },
            },
        ],
    };

    const globalCssLoader = {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
    };

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        globalCssLoader,
        typescriptLoader,
        cssLoader,
    ]
}
