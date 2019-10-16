<template>
  <g-link :to="edge.node.path" class="project-link">
    <div class="image" :style="`backgroundImage: url(${edge.node.cover_img})`"></div>
    <div class="info">
      <h4>{{edge.node.title}}</h4>
      <p>{{edge.node.description}}</p>
      <div class="techs">
        <img
          v-for="tech in edge.node.tech"
          :key="tech"
          :src="`/icons/${tech}.png`"
          class="tech_icon"
        />
      </div>
    </div>
  </g-link>
</template>

<script>
export default {
  name: "blog-link",
  props: ["edge"]
};
</script>

<style lang="scss">
.project-link {
  color: #000;
  text-decoration: none;
  display: grid;
  grid-template-columns: 300px auto;
  grid-column-gap: 2rem;
  margin: 3rem 0;

  .image {
    background-color: #fff;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
  }

  h3,
  p {
    margin: 0.5rem 0;
  }

  .techs {
    display: flex;
    justify-content: flex-end;
    grid-column: 2/3;

    .tech_icon {
      height: 2rem;
      padding: 0 0.5rem;
      filter: grayscale(1);
      transition: 0.3s;
    }
  }

  &:hover {
    .image {
      filter: grayscale(0);
    }
    .techs {
      .tech_icon {
        filter: grayscale(0);
      }
    }
  }
}
</style>