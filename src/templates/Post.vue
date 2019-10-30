<template>
  <div class="post">
    <div class="baner">
      <div class="info">
        <h2 class="title">{{$page.post.title}}</h2>
        <BackArrow to="/blog" />
        <div class="date">Utworzono: {{$page.post.date}}</div>
        <div class="tags">
          Tagi:
          <g-link v-for="tag in $page.post.tags" :key="tag.id" :to="tag.path">{{tag.id}}</g-link>
        </div>
      </div>
      <div class="cover">
        <img :src="$page.post.cover_img" alt />
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
query Post($id: ID!) {
  post (id: $id) {
    title
    author
    cover_img
    date (format: "YYYY-MM-DD")
    tags {
      id
      color
      path
    }
    path
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
      title: this.$page.post.title,
      meta: [
        {
          key: "og:image",
          property: "og:image",
          content: `https://amazeddeveloper.pl${this.$page.post.cover_img}`
        },
        {
          key: "og:title",
          property: "og:title",
          content: `${this.$page.post.title} - AmazedDeveloper.pl`
        },
        {
          key: "og:description",
          property: "og:description",
          content: this.$page.post.description
        },
        {
          key: "og:url",
          property: "og:url",
          content: `https://amazeddeveloper.pl${this.$page.post.path}`
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.post {
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
      padding: 0 2rem 3rem;
      display: flex;
      flex-direction: column;

      .title {
        width: 70%;
        align-self: flex-end;
        margin: 3rem 0 2rem;
      }

      .tags {
        justify-self: flex-end;
        font-weight: bold;
        position: absolute;
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        bottom: 1rem;
        right: 2rem;
        width: 80%;
        text-align: right;

        a {
          padding: 0;
          margin: 0 0.5rem;
          color: #000;
          font-weight: normal;
          font-style: italic;
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
    }
  }

  @media (max-width: 800px) {
    overflow: hidden;
    .baner {
      grid-template-columns: 1fr;

      .info {
        padding: 2rem;
        padding-bottom: 5rem;
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
      }
    }
  }
}
</style>