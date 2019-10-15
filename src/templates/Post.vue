<template>
  <div class="post">
    <div class="baner">
      <div class="info">
        <h2 class="title">{{$page.post.title}}</h2>
        <g-link class="back" to="/blog">&#8592;</g-link>
        <div class="tags">
          <g-link
            v-for="tag in $page.post.tags"
            :key="tag.id"
            :to="tag.path"
            :style="`padding: 0.3rem; margin: 0 0.5rem; color: #000`"
          >{{tag.id}}</g-link>
        </div>
      </div>
      <div class="cover">
        <img :src="$page.post.cover_img" alt />
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
export default {
  components: {
    Navigation,
    Footer
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
      }
    }

    .info {
      position: relative;
      text-align: right;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .back {
        position: absolute;
        left: 3rem;
        top: 5rem;
        text-decoration: none;
        color: black;
        font-size: 3rem;
        line-height: 0;
      }

      .title {
        width: 70%;
        align-self: flex-end;
      }

      .tags {
        justify-self: flex-end;
      }
    }
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;

    .header {
      position: sticky;
      top: 3rem;
      right: 2rem;
      align-self: flex-end;
      margin-top: 3rem;
    }

    .remark {
      position: relative;
      top: -8rem;
      width: 60%;
      max-width: 1024px;
      margin: 2rem auto;
    }
  }
}
</style>