<template>
  <div class="layout">
    <div class="main-grid">
      <div class="baner">
        <div class="cover-image"></div>
      </div>
      <div class="content">
        <Navigation />
        <font-awesome :icon="['fab', 'github']" />
        <div class="container">
          <slot />
        </div>
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
      grid-template-columns: 400px auto;

      .baner {
        background-color: #000;
        position: relative;

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
      }
      .content {
        width: 100%;

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
</style>
