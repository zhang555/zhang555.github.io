import {sidebar} from "vuepress-theme-hope";

// export default sidebar({
//     "/": [
//         "",
//         {
//             text: "如何使用",
//             icon: "laptop-code",
//             prefix: "demo/",
//             link: "demo/",
//             children: "structure",
//         },
//         {
//             text: "文章",
//             icon: "book",
//             prefix: "posts/",
//             children: "structure",
//         },
//         // "intro",
//         // "slides",
//     ],
//
//     "/ai": [
//         // "",
//         {
//             text: "Bar",
//             prefix: "/ai/",
//             children: [
//                 "" /* /bar/ */,
//                 "three" /* /bar/three.html */,
//                 "four" /* /bar/four.html */,
//             ],
//         },
//     ],
// });

export default sidebar({
    "/backend/": "structure",
    "/ai/": "structure",

    // fallback
    // "/": [
    //     "" /* / */,
    //     "contact" /* /contact.html */,
    //     "about" /* /about.html */,
    // ],
});


// export default sidebar("heading");
