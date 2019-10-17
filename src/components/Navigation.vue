<template>
  <header class="header">
    <nav class="nav">
      <g-link class="nav__link" to="/projects">Projekty</g-link>
      <g-link class="nav__link" to="/blog/">Blog</g-link>
      <g-link class="nav__link" to="/about/">O mnie</g-link>
      <g-link class="nav__link" to="/contact/">Kontakt</g-link>
    </nav>
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
export default {};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 2rem;
  left: calc(100vw - 200px);
  width: 150px;

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
}
</style>