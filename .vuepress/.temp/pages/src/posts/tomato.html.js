export const data = JSON.parse("{\"key\":\"v-2c84ee0f\",\"path\":\"/src/posts/tomato.html\",\"title\":\"番茄\",\"lang\":\"en-US\",\"frontmatter\":{\"cover\":\"/assets/images/cover2.jpg\",\"icon\":\"pen-to-square\",\"date\":\"2022-01-12T00:00:00.000Z\",\"category\":[\"蔬菜\"],\"tag\":[\"红\",\"圆\"],\"star\":true,\"sticky\":true},\"headers\":[{\"level\":2,\"title\":\"标题 2\",\"slug\":\"标题-2\",\"link\":\"#标题-2\",\"children\":[{\"level\":3,\"title\":\"标题 3\",\"slug\":\"标题-3\",\"link\":\"#标题-3\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"src/posts/tomato.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
