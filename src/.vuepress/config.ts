import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

import {registerComponentsPlugin} from '@vuepress/plugin-register-components'

import {path} from '@vuepress/utils'


export default defineUserConfig({
    base: "/",

    lang: "zh-CN",
    title: "程序员弓哥",
    description: "",


    theme,


    plugins: [
        registerComponentsPlugin({
            // 配置项
            componentsDir: path.resolve(__dirname, './components'),


        }),

    ]
    // Enable it with pwa
    // shouldPrefetch: false,
});
