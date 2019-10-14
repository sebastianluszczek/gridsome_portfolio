<template>
  <Layout>
    <h1>Projects</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore expedita similique numquam animi maiores voluptates delectus in incidunt facere, dignissimos aperiam perspiciatis voluptatibus! Odit voluptatibus eaque ut quasi dolorem maiores optio voluptas facilis laboriosam? Soluta quam, officiis iste quasi nihil repellat accusamus ad molestiae necessitatibus, asperiores dolorem libero aut sint?</p>
    <div v-for="edge in $page.projects.edges" :key="edge.node.title">
      <g-link :to="edge.node.path">{{edge.node.title}}</g-link>
    </div>
  </Layout>
</template>

<page-query>
query Projects {
  projects: allProject {
    edges {
      node {
        title
        path
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Blog"
  }
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
