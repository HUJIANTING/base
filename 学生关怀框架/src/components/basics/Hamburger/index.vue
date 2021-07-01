<template>
  <div>
    <div
      class="hamburger"
      :class="{'is-active':isActive}"
      @click="toggleClick"
    >
      <img class="image" :src="isActive?require('../../../../static/login/show.png') : require('../../../../static/login/hid.png')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 50px;
	height: 50px;
	transform: rotate(0deg);
	transition: .38s;
	transform-origin: 50% 50%;
}

.hamburger.is-active {
	/* transform: rotate(90deg); */
}
.image{
  width: 40%;
}

</style>
