<template>
  <div class="banner">
    <div class="banner-content">
      <div class="slogan">
        <h1 class="main_text">Web Development might* be fun!</h1>
        <div class="name">
          <h3>Amazed</h3>
          <h1>Developer</h1>
        </div>
      </div>
      <div class="logo"></div>
    </div>
    <Navigation />
    <p class="answer">* but mostly is only pain!</p>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
export default {
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
.banner {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;

  .banner-content {
    position: relative;
    height: 50vh;
    width: 70%;
    margin: 15vh auto;
    display: grid;
    grid-template-columns: 2fr 1fr;

    .main_text {
      font-size: 72px;
    }

    .name {
      margin-top: 2rem;

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
    .logo {
      width: 22vw;
      height: 22vw;
      background-image: url("/images/amazed_favicon.png");
      border-radius: 10% 10% 50% 50% / 10% 10% 50% 50%;
      background-size: cover;
      background-position: -1px -1px;
      background-color: transparent;
    }

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      border: 1px solid #444;
      z-index: -1;
      position: absolute;
      top: 7rem;
      left: 5rem;
    }
  }
  .answer {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    font-size: 1rem;
    font-style: italic;
  }
}
</style>