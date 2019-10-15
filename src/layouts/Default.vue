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
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
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
            width: 12vw;
            height: 12vw;
            background-image: url("/images/amazedbear.jpeg");
            border-radius: 50%;
            background-size: cover;
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
          }
        }
      }
      .content {
        width: 100%;
        grid-column: 2/3;

        .container {
          width: 70%;
          margin: 4rem;
        }
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 80px;
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
