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
    // "/backend/": "structure",

    // sidebar: "heading",


    // "/": [
    //     {
    //
    //         collapsible: false,
    //
    //         text: "指南",
    //         icon: "lightbulb",
    //         prefix: "",
    //         children: [
    //             // "get-started/",
    //             // "interface/",
    //             // "layout/",
    //             // "markdown/",
    //             // "feature/",
    //             // "blog/",
    //             // "customize/",
    //             // "advanced/",
    //
    //             "/",
    //         ],
    //     },
    // ],

    "/ai/": "structure",
    // "contact": "contact.md",

    "/backend/": [

        // "",

        {
            collapsible: false,

            text: "指南",
            icon: "lightbulb",
            prefix: "",
            // children: [
            //     "1-1back2",
            //     "1-2back2",
            // ],
            children: "structure",
        },
    ],


    // fallback
    // "/": [
    //     "" /* / */,
    //     "contact" /* /contact.html */,
    //     "about" /* /about.html */,
    // ],
});


// export default sidebar("heading");
