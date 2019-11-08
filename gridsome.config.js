// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Amazed Developer",
  siteUrl: "https://www.amazeddeveloper.pl",
  icon: "./static/images/amazed_favicon.png",
  titleTemplate: "%s - AmazedDeveloper.pl",
  plugins: [
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Project",
        baseDir: "./markdown/projects",
        template: "./src/templates/Project.vue",
        pathPrefix: "/projects",
        route: "/projects/:title"
      }
    },
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Tag",
        baseDir: "./markdown/tags",
        template: "./src/templates/Tag.vue",
        pathPrefix: "/blog/tags"
      }
    },
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Post",
        baseDir: "./markdown/posts",
        template: "./src/templates/Post.vue",
        pathPrefix: "/posts",
        route: "/blog/:slug",
        refs: {
          tags: "Tag"
        },
        plugins: ["@gridsome/remark-prismjs", { transformInlineCode: false }]
      }
    }
  ]
};
