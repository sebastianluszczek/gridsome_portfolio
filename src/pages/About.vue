<template>
  <Layout class="about-layout">
    <h1 class="page-title">O mnie</h1>
    <p>
      Programuję komercyjnie już trochę ponad rok. W pracy głównie zajmuję się budową front-end'owych części dużych aplikacji, głównie używając do tego
      <strong>Vue + Vuex</strong>.
      Skupiamy się na rozmawianiu aplikacji z zewnętrzymi API (
      <strong>REST i GraphQL</strong>) pisanymi przez moich współpracowników oraz zewnętrzne firmy, oraz prezentowaniu wyników backendowych operacji użytkownikowi.
      Do tego sporo w mojej pracy kombinowania legacy codem, głównie pozbywanie się z apek jQuery.
    </p>
    <div class="stack">
      <p>Technologie front-endowe:</p>
      <div class="icons">
        <img src="/icons/HTML5.png" alt class="icon" />
        <img src="/icons/CSS.png" alt class="icon" />
        <img src="/icons/JavaScript.png" alt class="icon" />
        <img src="/icons/SASS.png" alt class="icon" />
        <img src="/icons/vuejs.png" alt class="icon" />
        <img src="/icons/gridsome.png" alt class="icon" />
        <img src="/icons/vuetify.png" alt class="icon" />
        <img src="/icons/nuxt.png" alt class="icon" />
        <img src="/icons/apollo.png" alt class="icon" />
        <img src="/icons/react.png" alt class="icon" />
      </div>
    </div>
    <div class="stack">
      <p>Technologie back-endowe:</p>
      <div class="icons">
        <img src="/icons/nodejs.png" alt class="icon" />
        <img src="/icons/graphql.png" alt class="icon" />
        <img src="/icons/mongo_db.png" alt class="icon" />
        <img src="/icons/JWT.png" alt class="icon" />
        <img src="/icons/firebase.png" alt class="icon" />
        <img src="/icons/mysql.webp" alt class="icon" />
      </div>
    </div>
    <p>
      Nie czuję się ekspertem w tych technologiach, ale w każdej z nich wykonałem kilka prostszych lub trudniejszych
      projektów. Zwłaszcza back-end jest dla mnie nową rzeczą, ale w ostatnim czasie poświęcam mu bardzo dużo uwagi.
    </p>
    <div class="stack">
      <p>Do tego w swojej pracy używam przydatnych narzędzi:</p>
      <div class="icons">
        <img src="/icons/git.png" alt class="icon" />
        <img src="/icons/unix.png" alt class="icon" />
        <img src="/icons/webpack.png" alt class="icon" />
        <img src="/icons/figma.png" alt class="icon" />
        <img src="/icons/postman.png" alt class="icon" />
      </div>
    </div>
    <p>
      Jesteś zainteresowany moją pracą?
      <strong>Pobierz CV!</strong>
    </p>
    <g-link target="_blank" to="/documents/Sebastian_Łuszczek_CV.pdf">
      <button class="button">CV</button>
    </g-link>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Info"
  }
};
</script>

<style lang="scss">
.about-layout {
  .title {
    margin-top: 3rem;
  }

  .stack {
    margin: 2rem 0;

    .icons {
      display: flex;
      flex-wrap: wrap;

      .icon {
        margin: 0.5rem;
        height: 54px;
        filter: grayscale(1);
        transition: 0.3s;

        &:hover {
          filter: grayscale(0);
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .stack {
      margin: 1rem 0;

      .icons {
        .icon {
          height: 42px;
        }
      }
    }
  }

  @media (max-width: 450px) {
    .stack {
      margin: 1rem 0;

      .icons {
        .icon {
          height: 32px;
        }
      }
    }
  }
}
</style>
