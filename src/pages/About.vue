<template>
  <Layout class="about-layout">
    <h1 class="page-title">O mnie</h1>
    <p>
      Programuję komercyjnie już blisko 2 lata. Przez większość czasu zajmowałem się budową front-end'owych części dużych aplikacji, głównie używając do tego
      <strong>Vue + Vuex</strong>. Mimo tego cały czas rozwijałem zdolności back-end'owe, pisałem własne projekty w <strong>NodeJS i ExpressJS</strong>, np. takie jak <strong>RESTful APIs</strong>. W projektach wykorzystywałem bazy SQL i No-SQL. 
    </p>
    <p>Od kilku miesięcy za to pracuję jako <strong>back-end developer</strong> i  <strong>data scientist</strong>. Pracuję ogólnie w środowisku związanym z <strong>Python'em</strong>, wykorzystując pakiety związane z przetwarzaniem danych i machine learningiem (<strong>Numpy, Pandas, sklearn, Keras</strong>), po pakiety do budowania RESTful API. (<strong>Flask</strong>)</p>
    <div class="stack">
      <p>Technologie back-endowe:</p>
      <div class="icons">
        <img src="/icons/python.png" alt class="icon" />
        <img src="/icons/flask.png" alt class="icon" />
        <img src="/icons/nodejs.png" alt class="icon" />
        <img src="/icons/rest.png" alt class="icon" />
        <img src="/icons/graphql.png" alt class="icon" />
        <img src="/icons/mongo_db.png" alt class="icon" />
        <img src="/icons/mysql.webp" alt class="icon" />
        <img src="/icons/JWT.png" alt class="icon" />
        <img src="/icons/docker.png" alt class="icon" />
      </div>
    </div>
    <div class="stack">
      <p>Technologie back-endowe:</p>
      <div class="icons">
        <img src="/icons/pandas.png" alt class="icon" />
        <img src="/icons/numpy.png" alt class="icon" />
        <img src="/icons/matplotlib.svg" alt class="icon" />
        <img src="/icons/bokeh.png" alt class="icon" />
        <img src="/icons/sklearn.png" alt class="icon" />
        <img src="/icons/keras.png" alt class="icon" />
      </div>
    </div>
    <div class="stack">
      <p>Data science:</p>
      <div class="icons">
        <img src="/icons/vuejs.png" alt class="icon" />
        <img src="/icons/gridsome.png" alt class="icon" />
        <img src="/icons/JavaScript.png" alt class="icon" />
        <img src="/icons/HTML5.png" alt class="icon" />
        <img src="/icons/CSS.png" alt class="icon" />
        <img src="/icons/SASS.png" alt class="icon" />
        <img src="/icons/react.png" alt class="icon" />
      </div>
    </div>
    <p>
      Wciąż rozwijam swoje umiejętności. W tym momencie skupiam się najbardziej na Pythonie w kontekście przetwarzania danych a konteneryzacji aplikacji back-end'owych. Na blogu opisuję postępy swojej pracy i nauki.
    </p>
    <div class="stack">
      <p>Do tego w swojej pracy używam przydatnych narzędzi:</p>
      <div class="icons">
        <img src="/icons/git.png" alt class="icon" />
        <img src="/icons/unix.png" alt class="icon" />
        <img src="/icons/markdown.png" alt class="icon" />
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
