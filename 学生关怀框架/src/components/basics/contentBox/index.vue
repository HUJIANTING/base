<template>
  <div>
    <div class="subcontent">
      <div class="subcontent-left">
        <slot name="left" />
      </div>
      <div class="subcontent-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.subcontent {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  min-height: 750px;
  background: #f0f2f5;

  .subcontent-left {
    width: 290px;
    opacity: 1;
    background: #ffffff;
    border-radius: 2px;
  }

  .subcontent-right {
    margin-left: 20px;
    flex: 1;
    background: #ffffff;
    border-radius: 2px;
  }
}
</style>
