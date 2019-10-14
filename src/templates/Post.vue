<template>
  <div style="margin: 0 auto; width: 60vw; max-width: 1024px">
    <h1>{{$page.post.title}}</h1>
    <g-link class="back" to="/blog">&#8592;</g-link>
    <p>
      <strong>Author:</strong>
      {{$page.post.author}}
    </p>
    <strong>Tags:</strong>
    <g-link
      v-for="tag in $page.post.tags"
      :key="tag.id"
      :to="tag.path"
      :style="`padding: 0.2rem 1rem; margin: 0 0.5rem; color: ${tag.color}; border: 1px solid; border-radius: 5px;`"
    >{{tag.id}}</g-link>

    <VueRemarkContent />
  </div>
</template>

<page-query>
query Post($id: ID!) {
  post (id: $id) {
    title
    author
    tags {
      id
      color
      path
    }
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