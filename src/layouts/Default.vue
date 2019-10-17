<template>
  <div class="layout">
    <div class="main-grid">
      <div class="baner">
        <div class="cover-image"></div>
        <g-link class="baner-logo" to="/">
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
      <div class="content">
        <Navigation />
        <transition name="fade" appear>
          <div class="container">
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation";
export default {
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;

  .layout {
    width: 100%;

    .main-grid {
      display: grid;
      min-height: 100vh;
      grid-template-columns: 25vw auto;

      .baner {
        background-color: #000;
        position: fixed;
        top: 0;
        left: 0;
        width: 25vw;
        height: 100vh;

        .cover-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("/images/bgi.jpg");
          background-position: center;
          background-size: cover;
          filter: brightness(0.5) grayscale(0.5);
        }

        .baner-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          text-decoration: none;

          .logo {
            width: 15vw;
            height: 15vw;
            background-image: url("/images/amazed_favicon.png");
            border-radius: 10% 10% 50% 50% / 10% 10% 50% 50%;
            background-size: cover;
            background-position: -1px -1px;
            position: relative;

            &::before {
              content: "";
              z-index: -1;
              border-radius: 50%;
              position: absolute;
              width: 100%;
              height: 100%;
              background-color: #fff;
            }
          }

          .name {
            margin-top: 2rem;
          }

          h3 {
            font-weight: normal;
            margin: 0;
            font-size: 2rem;
          }

          h1 {
            margin: 0;
            font-weight: 900;
            font-size: 3rem;
            position: relative;
            top: -1rem;
          }
        }

        .baner-footer {
          color: #fff;
          position: absolute;
          bottom: 1rem;
          width: 100%;
          left: 0;
          z-index: 5;
          text-align: center;
          font-weight: 200;
          font-size: 0.9rem;

          .socials {
            margin-bottom: 0.5rem;
            a {
              font-size: 1.6rem;
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
      .content {
        width: 100%;
        grid-column: 2/3;

        .container {
          width: 65%;
          margin: 4rem;
        }
      }
    }
  }

  .nav__link {
    margin-left: 20px;
  }
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter {
  opacity: 0;
  transform: translateX(50px);
}
</style>
