import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "程序员弓哥",
  description: "",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
