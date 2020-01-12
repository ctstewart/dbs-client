<template>
<div class="newPasswordContainer">
    <div class="newPasswordDiv">
        <p>Password</p>
        <input type="password" placeholder="password" v-model="password">
        <p>Confirm Password</p>
        <input type="password" placeholder="password" v-model="confirmPassword" @keyup.enter="resetPassword">
        <span v-if="errorText !== ''" class="errorText">{{ errorText }}</span>
        <span v-else-if="successText !== ''" class="successText">{{ successText }}</span>
        <button v-else @click="resetPassword">SUBMIT</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
    name: 'LoginForm',
    data: function () {
        return {
            password: '',
            confirmPassword: '',
            errorText: '',
            successText: ''
        }
    },
    methods: {
        ...mapMutations([
            'mutate'
        ]),
        resetPassword: function () {
            if (this.password !== this.confirmPassword) {
                this.errorText = 'Passwords do not match'
                setTimeout(() => {
                    this.errorText = ''
                }, 2000)
            } else {
                axios({
                    method: 'post',
                    url: '/api/users/resetPassword',
                    data: { password: this.password },
                    headers: { authorization: `Bearer: ${this.$route.params.resetToken}` }
                })
                .then((response) => {
                    this.successText = response.data.msg
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 4000)
                })
                .catch((error) => {
                    this.errorText = 'Unknown error. Please choose "Forgot your password?" again from the login page to send a new link.'
                    setTimeout(() => {
                        this.errorText = ''
                        this.$router.push('/login')
                    }, 4000)
                })
            }
        },
        saveTokenToLocalStorage: function (value) {
            const parsed = JSON.stringify(value)
            localStorage.setItem('jwt', parsed)
        }
    }
}
</script>

<style>
.newPasswordContainer {
    height: 100%;
    display: -ms-grid;
    display: grid;
}

.newPasswordDiv {
    display: -ms-grid;
    display: grid;
    background-color: rgba(255,255,255,.8);
    width: 50%;
    height: 50%;
    margin: 0 auto;
    -ms-grid-row-align: center;
    -ms-grid-column-align: center;
    place-self: center;
    align-self: center;
    justify-self: center;
    border-radius: 5px;
    grid-template-rows: 15% 15% 15% 15% 40%;
    justify-items: center;
}

.newPasswordDiv p,
.newPasswordDiv input,
.newPasswordDiv button {
    width: 80%;
    padding: 1%;
}

.newPasswordDiv p {
    font-size: .9rem;
    margin: 0;
    padding: 0;
    align-self: end;
    font-weight: bold;
}

.newPasswordDiv input {
    margin: 0;
    padding: 0;
    text-indent: .5rem;
    align-self: end;
    height: 2rem;
}

.newPasswordDiv span {
    align-self: center;
}

.errorText {
    color: red;
}

.successText {
    color: green;
}

.newPasswordDiv button {
    align-self: center;
    color: white;
    background-color: #1F596E;
    border-radius: 5px;
    width: 7rem;
    height: 3.5rem;
    border: none;
    font-weight: bold;
    font-size: 20px;
    outline: none;
    cursor: pointer;
}
</style>