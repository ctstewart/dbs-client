<template>
<div class="passwordResetDiv">
    <h2>Password Reset</h2>
    <p>Email</p>
    <input type="email" placeholder="johndoe@gmail.com" v-model="email" @keyup.enter="sendEmailForPasswordReset">
    <div class="buttonGroup">
        <button @click="sendEmailForPasswordReset">RESET</button>
        <button @click="$emit('change-to-form', 'LoginForm')">Go Back</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ResetPasswordForm',
    data: function () {
        return {
            email: ''
        }
    },
    methods: {
        sendEmailForPasswordReset: function () {
            axios.post('/api/users/sendPasswordResetEmail', {
                "email": this.email
            })
            .then((response) => {
                console.log(response.data.msg)
                this.$emit('change-to-form', 'ResetPasswordConfirmation')
            })
            .catch((error) => {
                console.log('API Error')
            })
        },
    }
}
</script>

<style>
.passwordResetDiv {
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
    grid-template-rows: 15% 15% 15% 55%;
    justify-items: center;
}

.passwordResetDiv p,
.passwordResetDiv input,
.passwordResetDiv button {
    width: 80%;
    padding: 1%;
}

.passwordResetDiv p {
    font-size: .9rem;
    margin: 0;
    padding: 0;
    align-self: end;
    font-weight: bold;
}

.passwordResetDiv input {
    margin: 0;
    padding: 0;
    text-indent: .5rem;
    align-self: end;
    height: 2rem;
}

.passwordResetDiv span {
    align-self: center;
    color: red;
}

.passwordResetDiv button {
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

.buttonGroup {
    display: -ms-grid;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.buttonGroup > button {
    margin: 5%;
}

.buttonGroup > button:last-child {
    background-color: white;
    color: black;
    border: 1px solid grey;
}
</style>