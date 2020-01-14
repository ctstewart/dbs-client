<template>
<div class="passwordResetDiv">
    <h2>Password Reset</h2>
    <div>
        <p>Email</p>
        <input type="email" :value="email" @change="$emit('change-email', $event.target.value)" placeholder="johndoe@gmail.com" @keyup.enter="sendEmailForPasswordReset">
    </div>
    <div></div>
    <div class="buttonGroup">
        <button @click="$emit('change-to-form', 'LoginForm')">Go Back</button>
        <button @click="sendEmailForPasswordReset">RESET</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ResetPasswordForm',
    props: ['email'],
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
    },
}
</script>

<style lang="less">
.passwordResetDiv {
    display: -ms-grid;
    display: grid;
    grid-template-rows: 15% 30% 30% 25%;
    border-right: 1px solid grey;
    
    > div {
        display: -ms-grid;
        display: grid;
    }

    p {
        font-size: .9rem;
        margin: 0;
        padding-bottom: .5rem;
        align-self: end;
        font-weight: bold;
    }

    input {
        margin: 0;
        padding: 0;
        text-indent: .5rem;
        height: 2rem;
        border: 1px solid #1F596E;
        border-radius: 5px;

        &:focus {
            outline: none;
        }
    }

    button, span {
        align-self: center;
        justify-self: end;
    }

    button {
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

    span {
        color: red;
    }

    .forgotPassword {
        padding-top: 1%;
        font-size: 14px;
        display: -ms-grid;
        display: grid;
        align-items: center;
        color: #1F596E;
        text-decoration: underline;
        cursor: pointer;
    }
}

.buttonGroup {
    justify-self: end;
    display: -ms-grid;
    display: grid;
    grid-template-columns: 1fr 1fr;

    > button {
        margin: 2%;
    }

    > button:first-child {
        background-color: white;
        color: #1F596E;
        border: 1px solid #1F596E;
    }
}
</style>