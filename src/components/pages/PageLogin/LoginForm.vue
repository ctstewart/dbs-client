<template>
<div class="loginFormDiv">
    <p>Email</p>
    <input type="email" placeholder="johndoe@gmail.com" v-model="email">
    <p>Password</p>
    <input type="password" placeholder="password" v-model="password" @keyup.enter="loginUser">
    <span v-if="errorText !== ''">{{ errorText }}</span>
    <button v-else @click="loginUser">LOGIN</button>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
    name: 'LoginForm',
    data: function () {
        return {
            email: '',
            password: '',
            errorText: ''
        }
    },
    methods: {
        ...mapMutations([
            'mutate'
        ]),
        loginUser: function () {
            axios.post('/api/users/login', {
                "email": this.email,
                "password": this.password
            })
            .then((response) => {
                this.saveTokenToLocalStorage(response.data.token)
                this.mutate({property: 'userEmail', with: this.email})
                this.mutate({ property: 'jwtExp', with: response.data.jwtExp})
                this.$router.push('/')
            })
            .catch((error) => {
                this.errorText = 'Incorrect username or password'
                setTimeout(() => {
                    this.errorText = ''
                }, 2000)
            })
        },
        saveTokenToLocalStorage: function (value) {
            const parsed = JSON.stringify(value)
            localStorage.setItem('jwt', parsed)
        }
    }
}
</script>

<style>
.loginFormDiv {
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

.loginFormDiv p,
.loginFormDiv input,
.loginFormDiv button {
    width: 80%;
    padding: 1%;
}

.loginFormDiv p {
    font-size: .9rem;
    margin: 0;
    padding: 0;
    align-self: end;
    font-weight: bold;
}

.loginFormDiv input {
    margin: 0;
    padding: 0;
    text-indent: .5rem;
    align-self: end;
    height: 2rem;
}

.loginFormDiv span {
    align-self: center;
    color: red;
}

.loginFormDiv button {
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