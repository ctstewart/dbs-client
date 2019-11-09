<template>
  <div class="loginContainer">
    <component v-bind:is="currentComponent" v-on:change-to-form="currentComponent = 'LoginForm'"/>
  </div>
</template>

<script>
import LoginLanding from './LoginLanding'
import LoginForm from './LoginForm'

export default {
  name: 'PageLogin',
  components: { LoginLanding, LoginForm },
  data: function () {
    return {
      currentComponent: 'LoginLanding'
    }
  },
  created () {
    localStorage.clear()
  }
}
</script>

<style>
.loginContainer {
  height: 100%;
  display: -ms-grid;
  display: grid;
}
</style>