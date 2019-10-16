<template>
  <div class="project">
    <div class="baner">
      <div class="info">
        <h2 class="title">{{$page.project.title}}</h2>
        <BackArrow to="/projects" />
        <div class="links_section">
          Znajdź projekt:
          <div class="links">
            <g-link :to="$page.project.git" class="link" v-show="$page.project.git">
              <font-awesome :icon="['fab', 'github']" />
            </g-link>
            <g-link :to="$page.project.url" class="link" v-show="$page.project.url">
              <font-awesome :icon="['fas', 'globe-europe']" />
            </g-link>
            <g-link :to="$page.project.design" class="link" v-show="$page.project.design">
              <font-awesome :icon="['fab', 'figma']" />
            </g-link>
          </div>
        </div>
      </div>
      <div class="cover">
        <img :src="$page.project.cover_img" alt />
      </div>
    </div>

    <div class="content">
      <Navigation />
      <VueRemarkContent class="remark" />
      <Footer />
    </div>
  </div>
</template>

<page-query>
query Project($id: ID!) {
  project (id: $id) {
    title
    path
    cover_img
    url
    git
    design
  }
}
</page-query>

<script>
import Navigation from "~/components/Navigation.vue";
import Footer from "~/components/Footer.vue";
import BackArrow from "~/components/BackArrow.vue";
export default {
  components: {
    Navigation,
    Footer,
    BackArrow
  }
};
</script>

<style lang="scss">
.project {
  width: 100%;
  overflow-x: hidden;

  .baner {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .cover {
      width: 100%;

      img {
        width: 100%;
        border: 1px solid #ddd;
      }
    }

    .info {
      position: relative;
      text-align: right;
      padding: 0 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        width: 70%;
        align-self: flex-end;
        margin-top: 3rem;
      }

      .tags {
        justify-self: flex-end;
      }

      .links_section {
        .link {
          color: #222;
          font-size: 2rem;
          padding: 0.5rem;
        }
      }
    }
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;

    .header {
      position: sticky;
      top: 6rem;
      right: 2rem;
      align-self: flex-end;
      margin-top: 6rem;
    }

    .remark {
      position: relative;
      top: -10rem;
      width: 60%;
      max-width: 1024px;
      margin: 2rem auto;

      .md_icons_wrapper {
        .md_icon {
          height: 60px;
          padding: 1rem;
          filter: grayscale(1);
          transition: 0.2s;

          &:hover {
            filter: grayscale(0);
          }
        }
      }
    }
  }
}
</style>