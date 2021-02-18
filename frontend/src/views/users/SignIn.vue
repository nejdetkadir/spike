<template lang="pug">
  AuthForm(:is-login="true")
</template>

<script>
import AuthForm from "@/components/user/AuthForm"
export default {
  components: {
    AuthForm
  }
}
</script>