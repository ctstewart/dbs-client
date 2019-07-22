<template>
  <div class="loginContainer">
    <component v-bind:is="currentComponent" v-on:change-to-form="currentComponent = 'LoginForm'" v-on:change-page="$emit('change-page', $event)"></component>
  </div>
</template>

<script>
import LoginLanding from './LoginLanding'
import LoginForm from './LoginForm'

export default {
  name: 'PageLogin',

  components: {
    LoginLanding, LoginForm
  },

  data: function () {
    return {
      currentComponent: 'LoginLanding'
    }
  }
}
</script>

<style>
.loginContainer {
  height: 100%;
  display: grid;
}
</style>