<template>
  <Layout class="blog-layout">
    <h1 class="page-title">Blog</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore expedita similique numquam animi maiores voluptates delectus in incidunt facere, dignissimos aperiam perspiciatis voluptatibus! Odit voluptatibus eaque ut quasi dolorem maiores optio voluptas facilis laboriosam? Soluta quam, officiis iste quasi nihil repellat accusamus ad molestiae necessitatibus, asperiores dolorem libero aut sint?</p>
    <div v-for="edge in $page.posts.edges" :key="edge.node.title">
      <BlogLink :edge="edge" />
    </div>
  </Layout>
</template>

<page-query>
query Posts {
  posts: allPost {
    edges {
      node {
        title
        path
        description
        cover_img
        tags {
          id
          path
        }
      }
    }
  }
}
</page-query>

<script>
import BlogLink from "~/components/BlogLink";
export default {
  metaInfo: {},
  components: {
    BlogLink
  }
};
</script>

<style lang="scss">
.blog-layout {
  text-align: justify;
}
</style>
