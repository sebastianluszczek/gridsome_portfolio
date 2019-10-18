<template>
  <g-link class="back" :to="to">
    <div class="arrow">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <span class="text">back</span>
  </g-link>
</template>

<script>
export default {
  name: "back-arrow",
  props: ["to"]
};
</script>

<style lang="scss">
.back {
  position: fixed;
  left: 3rem;
  top: 3rem;
  text-decoration: none;
  color: black;
  font-size: 5rem;
  line-height: 0;
  width: 100px;
  height: 40px;
  cursor: pointer;
  z-index: 2;

  .arrow {
    span {
      width: 20px;
      height: 1px;
      background-color: #333;
      position: absolute;
      top: 15px;
      left: 0;

      &:nth-of-type(1) {
        transform: translate(-3px, -6px) rotate(-45deg);
      }

      &:nth-of-type(2) {
        transform: translate(-3px, 8px) rotate(45deg);
      }

      &:nth-of-type(3) {
        width: 85px;
        transform: translateY(1px);
      }
    }
  }

  .text {
    position: absolute;
    top: 2rem;
    left: 3rem;
    font-size: 0.9rem;
  }

  @media (max-width: 800px) {
    position: absolute;
    left: 1rem;

    .arrow {
      span {
        width: 10px;

        &:nth-of-type(1) {
          transform: translate(-2px, -2px) rotate(-45deg);
        }

        &:nth-of-type(2) {
          transform: translate(-1px, 5px) rotate(45deg);
        }

        &:nth-of-type(3) {
          width: 40px;
          transform: translateY(1px);
        }
      }
    }
    .text {
      position: absolute;
      top: 2rem;
      left: 1.3rem;
      font-size: 0.7rem;
    }
  }
}
</style>