<template>
  <Layout class="about-layout">
    <h1 class="page-title">O mnie</h1>
    <p>
      Jako programista z niespełna rocznym doświadczeniem komercyjnym nie mogę wciąż za dużo o sobie powiedzieć w
      odniesieniu do tej branzy. Naukę zacząłem późno, bo w wieku 27 lat, mając dyplom magistra studiów technicznych i 2
      lata doświadczenia w branży geologicznej.
      Lecz to nie było to co chciałem robić, nie czerpałem z tego przyjemność. Pomysł programowania, a dokładniej
      front-endu narodził się właśnie z potrzeby zmian.
    </p>
    <div class="stack">
      <p>Technologie front-endowe:</p>
      <div class="icons">
        <img src="/icons/HTML5.png" alt class="icon" />
        <img src="/icons/CSS.png" alt class="icon" />
        <img src="/icons/JavaScript.png" alt class="icon" />
        <img src="/icons/SASS.png" alt class="icon" />
        <img src="/icons/vuejs.png" alt class="icon" />
        <img src="/icons/vuetify.png" alt class="icon" />
        <img src="/icons/nuxt.png" alt class="icon" />
        <img src="/icons/apollo.png" alt class="icon" />
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
      </div>
    </div>
    <p>
      Nie czuję się ekspertem w tych technologiach, ale w każdej z nich wykonałem kilka prostszych lub trudniejszych
      projektów. Zwłaszcza back-end jest dla mnie bardzo nową rzeczą, ale chciałbym poświęcić na niego w przyszłości
      znacznei więcej czasu.
    </p>
    <div class="stack">
      <p>Do tego w swojej pracy używam przydatnych narzędzi:</p>
      <div class="icons">
        <img src="/icons/git.png" alt class="icon" />
        <img src="/icons/unix.png" alt class="icon" />
        <img src="/icons/webpack.png" alt class="icon" />
        <img src="/icons/figma.png" alt class="icon" />
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
export default {};
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
        padding: 0.5rem;
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
