<template>
  <header class="header">
    <nav class="nav">
      <g-link class="nav__link" to="/blog/">Blog</g-link>
      <g-link class="nav__link" to="/projects">Projekty</g-link>
      <g-link class="nav__link" to="/about/">O mnie</g-link>
      <g-link class="nav__link" to="/contact/">Kontakt</g-link>
    </nav>
    <div class="mobile-nav-bg" :class="{active: navShown}">
      <div class="mobile-nav-indicator" @click="navShown = !navShown">
        <div class="hamburger-btn" :class="{active: navShown}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav class="mobile-nav">
        <g-link class="nav__link" to="/blog/">Blog</g-link>
        <g-link class="nav__link" to="/projects">Projekty</g-link>
        <g-link class="nav__link" to="/about/">O mnie</g-link>
        <g-link class="nav__link" to="/contact/">Kontakt</g-link>
      </nav>
    </div>
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      navShown: false
    };
  }
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 2rem;
  left: calc(100vw - 200px);
  width: 150px;
  z-index: 10;

  .mobile-nav-bg {
    display: none;
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .nav__link {
      padding: 0.5rem 1rem;
      color: #000;
      text-decoration: none;
      outline: none;

      &.active {
        font-weight: 700;
      }
    }
  }

  &.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 800px) {
    background-image: linear-gradient(to right, #ffffff00 0%, #fff 25%);
    right: 0;
    top: 0;
    left: auto;

    .nav {
      display: none;
    }

    .mobile-nav-bg {
      display: block;
      color: #fff;
      position: fixed;
      top: 0;
      right: 0;

      &::after {
        content: "";
        position: absolute;
        width: 500px;
        height: 800px;
        background-color: #222;
        top: -450px;
        right: -450px;
        transform: rotate(-45deg);
        z-index: -1;
        transition: 0.3s;
      }

      .mobile-nav-indicator {
        position: fixed;
        top: 1rem;
        right: 1rem;

        .hamburger-btn {
          width: 32px;
          height: 24px;
          position: relative;

          span {
            width: 100%;
            height: 2px;
            display: block;
            position: absolute;
            background-color: #fff;
            left: 0;
            transition: 0.4s;

            &:nth-of-type(1) {
              top: 0;
            }

            &:nth-of-type(2) {
              top: 12px;
            }

            &:nth-of-type(3) {
              top: 23px;
            }
          }

          &.active {
            span {
              left: 0;

              &:nth-of-type(1) {
                top: 15px;
                transform: rotate(45deg);
              }

              &:nth-of-type(2) {
                top: 15px;
                opacity: 0;
              }

              &:nth-of-type(3) {
                top: 15px;
                transform: rotate(-45deg);
              }
            }
          }
        }
      }

      .mobile-nav {
        display: none;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 5rem;
        margin-right: 2rem;
        transition: 0.3s;
        position: fixed;
        top: -200px;
        right: -200px;

        .nav__link {
          padding: 1rem;
          color: #fff;
          text-decoration: none;
          outline: none;
          font-size: 1.2rem;

          &.active {
            font-weight: 700;
          }
        }
      }

      &.active {
        .mobile-nav {
          display: flex;
          top: 0;
          right: 0;
        }

        &::after {
          top: -300px;
          right: -300px;
        }
      }
    }
  }
}
</style>