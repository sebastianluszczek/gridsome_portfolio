<template>
  <div class="banner">
    <div class="banner-content">
      <div class="slogan">
        <h1 class="main_text">
          Development
          <br />might* be fun!
        </h1>
        <div class="name">
          <h3>Amazed</h3>
          <h1>Developer</h1>
        </div>
      </div>
      <div class="logo"></div>
    </div>
    <Navigation />
    <p class="answer">* but mostly, it is only pain!</p>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
export default {
  components: {
    Navigation
  },
  metaInfo: {
    title: "Start"
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
    margin: 20vh auto;
    display: grid;
    grid-template-columns: 2fr 1fr;

    .main_text {
      font-size: 72px;
      font-weight: 900;
    }

    .name {
      margin-top: 6rem;

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

  @media (max-width: 1200px) {
    .banner-content {
      margin: 15% auto;

      .main_text {
        font-size: 58px;
        font-weight: 900;
        text-align: left;
      }

      .name {
        margin-top: 3rem;

        h3 {
          font-size: 1.8rem;
        }

        h1 {
          font-size: 2.3rem;
        }
      }
    }
  }

  @media (max-width: 800px) {
    .banner-content {
      margin: 25% auto;
      width: 80%;

      .main_text {
        font-size: 52px;
        font-weight: 900;
        text-align: left;
      }

      .logo {
        align-self: end;
        width: 40vw;
        height: 40vw;
      }
    }
  }

  @media (max-width: 450px) {
    .banner-content {
      margin: 20% auto;
      grid-template-columns: 1fr;
      width: 90%;
      .main_text {
        font-size: 40px;
        font-weight: 900;
        text-align: left;
      }

      .logo {
        align-self: center;
        width: 40vw;
        height: 40vw;
        justify-self: end;
        position: relative;
        top: -5rem;
      }

      &::after {
        top: 3rem;
        left: 2rem;
      }
    }
  }
}
</style>