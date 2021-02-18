<template lang="pug">
  .container
    Header
    router-view.mt-5
</template>

<script>
import Header from "./components/shared/Header"
export default {
  components: {
    Header
  }
}
</script>