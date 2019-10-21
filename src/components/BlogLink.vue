<template>
  <div class="blog-link">
    <g-link :to="edge.node.path" class="blog-link-a">
      <div class="image" :style="`backgroundImage: url(${edge.node.cover_img})`"></div>
      <div class="info">
        <h4>{{edge.node.title}}</h4>
        <p>{{edge.node.description}}</p>
      </div>
    </g-link>
    <div class="tags">
      <g-link v-for="tag in edge.node.tags" :key="tag.id" :to="tag.path">{{tag.id}}</g-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-link",
  props: ["edge"]
};
</script>

<style lang="scss">
.blog-link {
  .blog-link-a {
    color: #000;
    text-decoration: none;
    display: grid;
    grid-template-rows: 140px auto;
    margin: 2rem 0 0;
  }

  .image {
    background-position: center;
  }

  h3,
  p {
    margin: 0.5rem 0;
  }

  @media (max-width: 1200px) {
    grid-template-rows: 100px auto;
  }

  .tags {
    display: flex;
    justify-content: flex-end;
    font-size: 0.9rem;
    font-style: italic;
    height: 2rem;

    a {
      padding: 0.3rem;
      margin: 0 0.5rem;
      color: #222;
    }
  }
}
</style>