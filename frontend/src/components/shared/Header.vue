<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-dark.bg-dark
    .container-fluid
      router-link.navbar-brand(to="/") SPIKE
      button.navbar-toggler(type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
        span.navbar-toggler-icon
      #navbarSupportedContent.collapse.navbar-collapse
        ul.navbar-nav.me-auto.mb-2.mb-lg-0
          li.nav-item
            router-link.nav-link(to="/game") Game Area
          li.nav-item
            router-link.nav-link(to="/score-board") Score Board
        .d-flex
          li.nav-item.dropdown(v-if="!isAuth")
            a#navbarDropdown.nav-link.dropdown-toggle.text-white(href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false') Sign in/up
            ul.dropdown-menu(aria-labelledby='navbarDropdown')
              li
                router-link.dropdown-item(to="/users/sign_in") Sign in
              li
                router-link.dropdown-item(to="/users/sign_up") Sign up
          li.nav-item(v-else)
            button.btn.btn-default(@click.prevent="logout") Logout
</template>

<script>
export default {
  data() {
    return {
      isAuth: false
    }
  },
  methods: {
    logout() {

    }
  },
}
</script>

<style scoped>
li{
  list-style: none;
}
</style>