<template>
  <Layout class="project-layout">
    <h1 class="page-title">Projekty</h1>
    <p>Na etapie swojej nauki, oraz obecnie jako aktywny zawodowo programista cały czas staram się rozwijać swoje umiejętności tworząc coraz to nowe projekty używając różnorodnych technologii <strong> front-end i back-end</strong>. Większość z nich są to stricte aplikacje treningowe zainspirowane kursami czy tutorialami w necie.</p>
    <p>Przewijają się jednak między nimi moje freelance'rskie projekty, jak właśnie to portfolio czy firmowa strona dla mojego brata. Mam nadzieję, ze w przyszłości będzie ich tu więcej. ;)</p>
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
