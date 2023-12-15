export const data = JSON.parse("{\"key\":\"v-0521efea\",\"path\":\"/src/posts/strawberry.html\",\"title\":\"草莓\",\"lang\":\"en-US\",\"frontmatter\":{\"icon\":\"pen-to-square\",\"date\":\"2022-01-11T00:00:00.000Z\",\"category\":[\"水果\",\"草莓\"],\"tag\":[\"红\",\"小\"]},\"headers\":[{\"level\":2,\"title\":\"标题 2\",\"slug\":\"标题-2\",\"link\":\"#标题-2\",\"children\":[{\"level\":3,\"title\":\"标题 3\",\"slug\":\"标题-3\",\"link\":\"#标题-3\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"src/posts/strawberry.md\"}")

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
