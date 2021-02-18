<template lang="pug">
  div 
    .col-md-6.text-center.mx-auto
      .alert.alert-danger(v-if="$route.query.userStatus") You must sign in to your account or sign up to Spike
      .alert.alert-success(v-if="$route.query.registerSuccess") You are now registered! You can sign in to your Spike account
      .alert.alert-success(v-if="$route.query.logoutSuccess") You have successfully logged out from Spike
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