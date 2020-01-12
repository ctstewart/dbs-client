<template>
<div class="loginContainer">
    <component v-bind:is="currentComponent" v-on:change-to-form="currentComponent = $event"/>
</div>
</template>

<script>
import LoginLanding from './LoginLanding'
import LoginForm from './LoginForm'
import ResetPasswordForm from './ResetPasswordForm'
import ResetPasswordConfirmation from './ResetPasswordConfirmation'

export default {
    name: 'PageLogin',
    components: { LoginLanding, LoginForm, ResetPasswordForm, ResetPasswordConfirmation },
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