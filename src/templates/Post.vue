<template>
  <div class="post">
    <div class="baner">
      <div class="info">
        <h2 class="title">{{$page.post.title}}</h2>
        <BackArrow to="/blog" />
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
    tags {
      id
      color
      path
    }
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
.post {
  overflow: hidden;
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
      padding: 0 2rem 1rem;
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
        font-weight: bold;

        a {
          padding: 0.5rem;
          padding-right: 0;
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
    .baner {
      grid-template-columns: 1fr;

      .info {
        margin-right: 3rem;
        margin-bottom: 2rem;
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
    .content {
      .remark {
        width: 90%;
      }
    }
  }
}
</style>