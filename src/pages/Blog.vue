<template>
  <Layout class="blog-layout">
    <h1>Blog</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore expedita similique numquam animi maiores voluptates delectus in incidunt facere, dignissimos aperiam perspiciatis voluptatibus! Odit voluptatibus eaque ut quasi dolorem maiores optio voluptas facilis laboriosam? Soluta quam, officiis iste quasi nihil repellat accusamus ad molestiae necessitatibus, asperiores dolorem libero aut sint?</p>
    <div v-for="edge in $page.posts.edges" :key="edge.node.title">
      <g-link :to="edge.node.path" class="blog-post-link">
        <div class="image" :style="`backgroundImage: url(${edge.node.cover_img})`"></div>
        <div class="info">
          <h4>{{edge.node.title}}</h4>
          <p>{{edge.node.description}}</p>
        </div>
        <div class="tags">
          <g-link
            v-for="tag in edge.node.tags"
            :key="tag.id"
            :to="tag.path"
            :style="`padding: 0.3rem; margin: 0 0.5rem; color: #000`"
          >{{tag.id}}</g-link>
        </div>
      </g-link>
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
export default {
  metaInfo: {
    title: "Blog"
  }
};
</script>

<style lang="scss">
.blog-layout {
  text-align: justify;

  .blog-post-link {
    color: #000;
    text-decoration: none;
    display: grid;
    grid-template-rows: 140px auto auto;
    margin: 2rem 0;

    .image {
      background-position: center;
    }

    h3,
    p {
      margin: 0.5rem 0;
    }

    .tags {
      display: flex;
      justify-content: flex-end;
      font-size: 0.9rem;
      color: #222;
      font-style: italic;
    }
  }
}
</style>
