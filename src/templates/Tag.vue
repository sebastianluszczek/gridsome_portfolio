<template>
  <Layout>
    <div class="tags">
      <h1>Tag: {{ $page.tag.id }}</h1>
      <p>Posts:</p>
      <div v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.title">
        <g-link :to="edge.node.path">{{edge.node.title}}</g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Tag($id: ID!) {
  tag(id: $id) {
    id
    belongsTo {
      edges {
        node {
          ... on Post {
            title
            path
          }
        }
      }
    }
  }
}
</page-query>

<script>
import Layout from "~/layouts/Default.vue";

export default {
  components: {
    Layout
  }
};
</script>

</script>

<style>
.tags {
  width: 100%;
}
</style>