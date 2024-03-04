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

    ],

    head: [
        // ...

        // 导入一个外部脚本
        // ["script", {src: "YOUR_SCRIPT_LINK"}],
        // 添加一段脚本
        [
            "script",
            {},
            `\
        <script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?c6ae3773f007a9f5b4397d8f8af12c21";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>

      `,
        ],


    ],


    // Enable it with pwa
    // shouldPrefetch: false,
});
