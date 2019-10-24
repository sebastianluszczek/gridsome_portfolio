<template>
  <Layout class="blog-layout">
    <h1 class="page-title">Blog</h1>
    <p>
      Długo zastanawiałem się jak nazwać tę podstronę. Nie chciałem pisać bloga, nie czuję się blogerem. Chciałbym aby ta część mojej strony to był jakby
      <strong>zbiór notatek z mojego procesu uczenia się technologi webowych</strong> . Nauczę się czegoś nowego to postaram się o tym napisać, zrozumiem lepiej jakąś technologię to wpis o tym też sie tu pojawi. Wszystko po to by lepiej utrwalić materiał, a przy okazji moze się to komuś przydać.
    </p>
    <p>
      Bo w końcu:
      <strong>"Nie rozumiesz w pełni zagadnienia, jeśli nie potrafisz go prosto wyjaśnić!"</strong>
    </p>
    <div v-for="edge in $page.posts.edges" :key="edge.node.title">
      <BlogLink :edge="edge" />
    </div>
  </Layout>
</template>

<page-query>
query Posts {
  posts: allPost(sortBy: "date", order: DESC, filter: { published: { eq: true }}) {
    edges {
      node {
        title
        path
        description
        cover_img
        date (format: "YYYY-MM-DD")
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
  metaInfo: {
    title: "Blog"
  },
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
