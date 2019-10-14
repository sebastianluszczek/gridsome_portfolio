<template>
  <header class="header">
    <nav class="nav">
      <g-link class="nav__link" to="/">Projects</g-link>
      <g-link class="nav__link" to="/blog/">Blog</g-link>
      <g-link class="nav__link" to="/about/">About</g-link>
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
  top: 3rem;
  right: 2rem;

  .nav {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .nav__link {
      padding: 0.5rem 1rem;
      color: #000;
      text-decoration: none;

      &.active--exact {
        font-weight: 700;
      }
    }
  }
}
</style>