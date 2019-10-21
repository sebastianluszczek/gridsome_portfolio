<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-banner">
          <g-link class="baner-logo" to="/">
            <div class="logo-bg"></div>
            <div class="logo"></div>
            <div class="name">
              <h3>Amazed</h3>
              <h1>Developer</h1>
            </div>
          </g-link>
          <div class="baner-footer">
            <div class="socials">
              <g-link to="https://www.facebook.com/luszczeksebastian">
                <font-awesome :icon="['fab', 'facebook']" />
              </g-link>
              <g-link to="https://www.linkedin.com/in/luszczeksebastian/">
                <font-awesome :icon="['fab', 'linkedin']" />
              </g-link>
              <g-link to="https://github.com/sebastianluszczek">
                <font-awesome :icon="['fab', 'github']" />
              </g-link>
            </div>
            <p class="info">
              Coded by Sebastian Łuszczek with
              <g-link to="https://vuejs.org/">Vue.js</g-link>&
              <g-link to="https://gridsome.org/">Gridsome</g-link>
            </p>
            <p class="info">
              Hosted on
              <g-link to="https://www.netlify.com/">Netlify</g-link>
            </p>
            <p class="info">&copy; All rights reserved.</p>
          </div>
        </div>
        <div class="latest-post">
          <p>Ostatni post na blogu:</p>
          <BlogLink :edge="$static.posts.edges[0]" />
        </div>
      </div>
    </div>
  </footer>
</template>

<static-query>
query Posts {
  posts: allPost(sortBy: "date", order: ASC, limit: 1, filter: { published: { eq: true }}) {
    edges {
      node {
        title
        path
        description
        cover_img
        date
        tags {
          id
          path
        }
      }
    }
  }
}
</static-query>

<script>
import BlogLink from "~/components/BlogLink";
export default {
  metaInfo: {},
  components: {
    BlogLink
  }
};
</script>

<style lang="scss">
.footer {
  width: 100%;
  background-color: #222;
  color: #fff;
  margin: 0;
  padding: 1rem 0;

  .footer-content {
    width: 70%;
    max-width: 1024px;
    margin: 1rem auto;

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1rem;
    }
  }

  .blog-link-a {
    grid-template-rows: 100px auto auto;
    color: #fff;
    margin: 1rem 0 0;
    .image {
      height: 100px;
    }
    .info {
      h4 {
        font-size: 1.6rem;
      }
      p {
        font-size: 0.8rem;
      }
    }

    .tags {
      a {
        color: #fff;
      }
    }
  }

  .footer-banner {
    position: relative;
    text-align: left;
    .baner-logo {
      color: #fff;
      text-decoration: none;
      display: grid;
      grid-template-columns: 100px auto;
      align-items: center;

      .logo-bg {
        grid-column: 1/2;
        grid-row: 1/2;
        border-radius: 50%;
        width: 79px;
        height: 80px;
        background-color: #fff;
      }

      .logo {
        grid-column: 1/2;
        grid-row: 1/2;
        width: 80px;
        height: 80px;
        background-image: url("/images/amazed_favicon.png");
        border-radius: 10% 10% 50% 50% / 10% 10% 50% 50%;
        background-size: cover;
        background-position: -1px -1px;
        position: relative;
      }
      .name {
        margin-top: 1rem;
      }

      h3 {
        font-weight: normal;
        margin: 0;
        font-size: 1.5rem;
      }

      h1 {
        margin: 0;
        font-weight: 900;
        font-size: 2.2rem;
        position: relative;
        top: -1rem;
      }
    }

    .baner-footer {
      color: #fff;
      font-weight: 200;
      font-size: 0.9rem;

      .socials {
        margin-bottom: 1rem;
        a {
          font-size: 1.5rem;
          padding: 1rem;
        }
      }
      a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        padding: 0 0.3rem;
      }
    }
  }

  @media (max-width: 800px) {
    .footer-content {
      width: 80%;
    }
  }

  @media (max-width: 800px) {
    .footer-content {
      .footer-grid {
        grid-template-columns: 1fr;
        grid-row-gap: 2rem;
      }
    }
  }
}
</style>