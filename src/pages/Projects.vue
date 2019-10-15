<template>
  <Layout class="project-layout">
    <h1>Projects</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore expedita similique numquam animi maiores voluptates delectus in incidunt facere, dignissimos aperiam perspiciatis voluptatibus! Odit voluptatibus eaque ut quasi dolorem maiores optio voluptas facilis laboriosam? Soluta quam, officiis iste quasi nihil repellat accusamus ad molestiae necessitatibus, asperiores dolorem libero aut sint?</p>
    <div v-for="edge in $page.projects.edges" :key="edge.node.title">
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
export default {
  metaInfo: {
    title: "Blog"
  }
};
</script>

<style lang="scss">
.project-layout {
  text-align: justify;

  .project-link {
    color: #000;
    text-decoration: none;
    display: grid;
    grid-template-columns: 300px auto;
    grid-column-gap: 2rem;
    margin: 2rem 0;

    .image {
      background-position: center;
      background-size: cover;
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
}
</style>
