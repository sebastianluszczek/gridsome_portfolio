<template>
  <Layout class="project-layout">
    <h1 class="page-title">Projekty</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore expedita similique numquam animi maiores voluptates delectus in incidunt facere, dignissimos aperiam perspiciatis voluptatibus! Odit voluptatibus eaque ut quasi dolorem maiores optio voluptas facilis laboriosam? Soluta quam, officiis iste quasi nihil repellat accusamus ad molestiae necessitatibus, asperiores dolorem libero aut sint?</p>
    <div v-for="edge in $page.projects.edges" :key="edge.node.title">
      <ProjectLink :edge="edge" />
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
        cover_img
        description
        tech
      }
    }
  }
}
</page-query>

<script>
import ProjectLink from "~/components/ProjectLink";
export default {
  metaInfo: {},
  components: {
    ProjectLink
  }
};
</script>

<style lang="scss">
.project-layout {
  text-align: justify;
}
</style>
