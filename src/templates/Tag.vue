<template>
  <Layout>
    <div class="tags">
      <h1>Blog</h1>
      <h2>
        Tag:
        <span>{{ $page.tag.id }}</span>
      </h2>
      <div v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.title">
        <BlogLink :edge="edge" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Tag($id: ID!) {
  tag(id: $id) {
    id
    belongsTo  {
      edges {
        node {
          ... on Post {
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
  }
}
</page-query>

<script>
import Layout from "~/layouts/Default.vue";
import BlogLink from "~/components/BlogLink";

export default {
  components: {
    Layout,
    BlogLink
  }
};
</script>

</script>

<style lang="scss">
.tags {
  width: 100%;

  h2 {
    span {
      font-style: italic;
      text-decoration: underline;
    }
  }
}
</style>