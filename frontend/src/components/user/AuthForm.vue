<template lang="pug">
  p {{isLogin ? 'Sign in' : 'Sign up'}}
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  }
}
</script>