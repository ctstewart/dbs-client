<template>
<div class="passwordResetDiv">
    <h2>Password Reset</h2>
    <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'Email', placeholder:'johndoe@gmail.com', meter:false}}" :value="email" v-on:value-changed="$emit('change-email', $event)" v-on:keyupEnter="sendEmailForPasswordReset"/>
    <div></div>
    <div class="buttonGroup">
        <button @click="$emit('change-to-form', 'LoginForm')">Go Back</button>
        <button @click="sendEmailForPasswordReset">RESET</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'

import InputField from '@/components/ui/InputField'

export default {
	name: 'ResetPasswordForm',
	props: ['email'],
	components: { InputField },
	methods: {
		sendEmailForPasswordReset: function () {
			axios.post('/api/users/sendPasswordResetEmail', {
				'email': this.email
			})
				.then((response) => {
					console.log(response.data.msg)
					this.$emit('change-to-form', 'ResetPasswordConfirmation')
				})
				.catch((error) => {
					console.log('API Error')
					console.log(error)
				})
		}
	}
}
</script>

<style lang="less">
.passwordResetDiv {
    display: -ms-grid;
    display: grid;
    grid-template-rows: 15% 30% 30% 25%;
    border-right: 1px solid grey;

    > div {
        display: grid;
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
        display: grid;
        align-items: center;
        color: #1F596E;
        text-decoration: underline;
        cursor: pointer;
    }
}

.buttonGroup {
    justify-self: end;
    display: grid;
    grid-template-columns: 1fr 1fr;

    > button:first-child {
        margin-right: .25rem;
        background-color: white;
        color: #1F596E;
        border: 1px solid #1F596E;
    }
}
</style>
