<template>
<div class="loginContainer gradientBackground">
    <div class="mainLoginDiv">
        <component v-bind:is="currentComponent" :email="email" v-on:change-email="email = $event" v-on:change-to-form="currentComponent = $event"/>
        <div class="loginInfoDiv">
            <h2>DIGITAL BENEFIT SHEET</h2>
            <h5>Making math easy, so you can focus on what's important.</h5>
            <br>
            <p>Why should you use this?</p>
            <ul>
                <li>You can focus more on benefits and less on math</li>
                <li>You get a clean and uniform look among all the stores</li>
                <li>Filling out a Benefit Sheet is faster and easier than ever</li>
            </ul>
        </div>
    </div>
    <div class="footer">Copyright &#9400; 2018-Current Christian Stewart All Rights Reserved</div>
</div>
</template>

<script>
import LoginForm from './LoginForm'
import ResetPasswordForm from './ResetPasswordForm'
import ResetPasswordConfirmation from './ResetPasswordConfirmation'

export default {
    name: 'PageLogin',
    components: { LoginForm, ResetPasswordForm, ResetPasswordConfirmation },
    data: function () {
        return {
            currentComponent: 'LoginForm',
            email: ''
        }
    },
    created () {
        localStorage.clear()
    }
}
</script>

<style lang="less">
.loginContainer {
    height: 100%;
    display: -ms-grid;
    display: grid;
}

.mainLoginDiv {
    display: -ms-grid;
    display: grid;
    width: 70%;
    max-width: 70rem;
    height: 50%;
    margin: 0 auto;
    -ms-grid-row-align: center;
    -ms-grid-column-align: center;
    place-self: center;
    align-self: center;
    justify-self: center;
    border-radius: 5px;
    grid-template-columns: repeat(2, 1fr);
    background-color: white;

    > div {
        padding: 1rem;
    }
}

.footer {
    position: fixed;
    bottom: 0;
    width: 400px;
    left: 50%;
    margin-left: -200px;
    font-size: .8rem;
    color: white;
}
</style>