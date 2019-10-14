<template>
  <div style="margin: 0 auto; width: 60vw; max-width: 1024px">
    <h1>{{$page.project.title}}</h1>
    <g-link class="back" to="/">&#8592;</g-link>
    <strong>Tags:</strong>

    <VueRemarkContent />
  </div>
</template>

<page-query>
query Project($id: ID!) {
  project (id: $id) {
    title
    path
  }
}
</page-query>

<script>
export default {};
</script>

<style>
.back {
  position: relative;
  left: -5rem;
  top: -3rem;
  text-decoration: none;
  color: black;
  font-size: 3rem;
  line-height: 0;
}
</style>