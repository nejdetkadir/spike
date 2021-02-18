<template lang="pug">
  div 
    .col-md-6.mx-auto
      .alert.alert-danger.text-center(v-if="$route.query.userStatus && !backendError") You must sign in to your account or sign up to Spike
      .alert.alert-success.text-center(v-if="$route.query.registerSuccess && !backendError") You are now registered! You can sign in to your Spike account
      .alert.alert-success.text-center(v-if="$route.query.logoutSuccess && !backendError") You have successfully logged out from Spike
      .alert.alert-danger.text-center(v-if="backendError") {{backendError.replace("username", "email")}}
      .card
        form.p-4
          .h2.text-center.m-4 {{isLogin ? 'Sign in' : 'Sign up'}} Form
          .mb-3(v-if="!isLogin")
            label.form-label Name
            input.form-control(type='text' v-model="$v.name.$model" :class="{'is-invalid' : $v.name.$error}")
            .form-text.text-danger(v-if="!$v.name.required && $v.name.$error") Your name is required
            .form-text.text-danger(v-if="!$v.name.maxLength && $v.name.$error") Your name should have a maximum length of {{$v.name.$params.maxLength.max}} characters
          .mb-3
            label.form-label Email address
            input.form-control(type='email' v-model="$v.email.$model" :class="{'is-invalid' : $v.email.$error}")
            .form-text.text-danger(v-if="!$v.email.required && $v.email.$error") Your email is required
            .form-text.text-danger(v-if="!$v.email.email && $v.email.$error") E-mail is not valid.
          .mb-3
            label.form-label Password
            input.form-control(type='password' v-model="$v.password.$model" :class="{'is-invalid' : $v.password.$error}")
            .form-text.text-danger(v-if="!$v.password.required && $v.password.$error") Your password is required
            .form-text.text-danger(v-if="!$v.password.minLength && $v.password.$error") Your password should have a minimum length of {{$v.password.$params.minLength.min}} characters
            .form-text.text-danger(v-if="!$v.password.letter && $v.password.$error") Your password should include at least one letter
            .form-text.text-danger(v-if="!$v.password.digit && $v.password.$error") Your password should include at least one digit
            .form-text.text-danger(v-if="!$v.password.symbol && $v.password.$error") Your password should include at least one symbol
            .form-text.text-danger(v-if="!$v.password.space && $v.password.$error") Your password should not include spaces
          .mb-3(v-if="!isLogin")
            label.form-label Confirm Password
            input.form-control(type='password' v-model="$v.passwordConfirm.$model" :class="{'is-invalid' : $v.passwordConfirm.$error}")
            .form-text.text-danger(v-if="!$v.passwordConfirm.required && $v.passwordConfirm.$error") Password confirm is required
            .form-text.text-danger(v-if="!$v.passwordConfirm.sameAsPassword && $v.passwordConfirm.$error") The passwords you entered are inconsistent.
          button.btn(:class="{'btn-primary' : isLogin, 'btn-success' : !isLogin}" @click.prevent="auth") {{isLogin ? 'Sign in' : 'Sign up'}}
          p {{isLogin ? '' : ''}}
</template>

<script>
import {required, email, maxLength, minLength, sameAs} from "vuelidate/lib/validators"
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
      backendError: null
    }
  },
  methods: {
    ...mapActions('account', ['login', 'registerUser']),
    async auth() {
      this.$v.$touch()
      if (!this.$v.$invalid || (this.isLogin && !this.$v.email.$invalid && !this.$v.password.$invalid)) {
        this.backendError = null
        try {
          if (this.isLogin) {
            await this.login({user: {
              email: this.email,
              password: this.password
            }})
            this.$router.push('/game')
          } else {
            await this.registerUser({user: {
              name: this.name,
              email: this.email,
              password: this.password
            }})
            this.$router.push('/users/sign_in?registerSuccess=1')
          }
        } catch (e) {
          this.backendError = e.response.data.message
        }
      }
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(20)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      letter(val) {
        return /[a-zA-Z]/.test(val)
      },
      digit(val) {
        return /\d/.test(val)
      },
      symbol(val) {
        return /[\W_]/.test(val)
      },
      space(val) {
        return /^\S+$/.test(val)
      }
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  }
}
</script>