<template>
<div class="loginFormDiv">
    <h2>Login</h2>
    <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'Email', placeholder:'johndoe@gmail.com', meter:false}}" :value="email" v-on:value-changed="$emit('change-email', $event)"/>
    <input-field v-bind="{inputStyle: {initialInputType: 'password', label:'Password', placeholder:'password', meter:false}}" :value="password" v-on:value-changed="password = $event" v-on:keyupEnter="loginUser"/>
    <div class="forgotPassword"><a @click="$emit('change-to-form', 'ResetPasswordForm')">Forgot your password?</a></div>
    <div>
        <span v-if="errorText !== ''">{{ errorText }}</span>
        <button v-else @click="loginUser">LOGIN</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapActions } from 'vuex'

import InputField from '@/components/ui/InputField'

export default {
	name: 'LoginForm',
	props: ['email'],
	components: { InputField },
	data: function () {
		return {
			password: '',
			errorText: ''
		}
	},
	methods: {
		...mapMutations([
			'mutate',
			'mutateUserInfo'
        ]),
        ...mapActions([
            'resetAll'
        ]),
		loginUser: function () {
			axios.post('/api/users/login', {
				'email': this.email,
				'password': this.password
			})
				.then((response) => {
					if (response.data.forceNewPassword) {
						this.errorText = 'Please create a new password'
						setTimeout(() => {
							this.errorText = ''
							this.$router.push(`/resetPassword/${response.data.token}`)
						}, 3000)
					} else {
                        this.resetAll()
                        sessionStorage.clear()
                        localStorage.clear()
						this.saveTokenToLocalStorage(response.data.token)
						this.mutateUserInfo({ property: 'email', with: this.email })
						this.mutateUserInfo({ property: 'firstName', with: response.data.firstName })
						this.mutateUserInfo({ property: 'lastName', with: response.data.lastName })
						this.mutateUserInfo({ property: 'admin', with: response.data.admin })
						this.mutateUserInfo({ property: 'superAdmin', with: response.data.superAdmin })
                        this.mutate({ property: 'jwtExp', with: response.data.jwtExp })
						this.$router.push('/')
					}
				})
				.catch(() => {
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

<style lang="less">
.loginFormDiv {
    display: -ms-grid;
    display: grid;
    grid-template-rows: 15% 30% 20% 10% 25%;
    border-right: 1px solid grey;

    > div {
        display: -ms-grid;
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
        display: -ms-grid;
        display: grid;
        align-items: center;
        color: #1F596E;
        text-decoration: underline;
        cursor: pointer;
    }
}

.loginInfoDiv {
    p, ul {
        font-size: .83em;
    }

    li {
        margin: 1rem 0;
    }
}
</style>
