<template>
  <div class="project">
    <BackArrow to="/projects" />
    <div class="baner">
      <div class="info">
        <h2 class="title">{{$page.project.title}}</h2>
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
      <Navigation class="sticky" />
      <VueRemarkContent class="remark" />
    </div>
    <Footer />
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
    description
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
  },
  metaInfo() {
    return {
      title: this.$page.project.title,
      meta: [
        {
          key: "og:image",
          property: "og:image",
          content: `https://amazeddeveloper.pl${this.$page.project.cover_img}`
        },
        {
          key: "twitter:card",
          name: "twitter:card",
          content: `https://amazeddeveloper.pl${this.$page.project.cover_img}`
        },
        {
          key: "og:title",
          property: "og:title",
          content: `${this.$page.project.title} - AmazedDeveloper.pl`
        },
        {
          key: "og:description",
          property: "og:description",
          content: this.$page.project.description
        },
        {
          key: "og:url",
          property: "og:url",
          content: `https://amazeddeveloper.pl${this.$page.project.path}`
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.project {
  width: 100%;

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

    .remark {
      position: relative;
      top: -8rem;
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

  @media (max-width: 800px) {
    overflow: hidden;
    .baner {
      grid-template-columns: 1fr;

      .info {
        padding: 2rem;
      }
    }

    .content {
      .remark {
        top: 0;
        width: 70%;
        margin-bottom: 3rem;
      }
    }
  }

  @media (max-width: 450px) {
    .baner {
      .info {
        .title {
          width: 90%;
        }
      }
    }
    .content {
      .remark {
        width: 90%;

        .md_icons_wrapper {
          .md_icon {
            height: 40px;
            padding: 0.5rem 1rem;
          }
        }
      }
    }
  }
}
</style>