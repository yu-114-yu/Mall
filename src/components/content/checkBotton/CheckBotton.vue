<template>
  <div class="check-botton" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckBotton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },  
  }
</script>

<style scoped>
  .check-botton {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid #aaa;
  }

  .check {
    border-color: var(--color-tink);
    background: var(--color-tink);
  }
</style>