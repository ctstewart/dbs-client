<template>
<div class="newPasswordContainer gradientBackground">
	<div class="newPasswordDiv">
		<div class="newPasswordFormDiv">
			<h2>Update Password</h2>
			<input-field v-bind="{inputStyle: {initialInputType: 'password', label:'Old Password', placeholder:'password', meter:false}}" :value="oldPassword" v-on:value-changed="oldPassword = $event"/>
			<input-field v-bind="{inputStyle: {initialInputType: 'password', label:'New Password', placeholder:'password', meter:true}}" :value="newPassword" v-on:value-changed="newPassword = $event"/>
			<input-field v-bind="{inputStyle: {initialInputType: 'password', label:'Confirm New Password', placeholder:'password', meter:false}}" :value="confirmNewPassword" v-on:value-changed="confirmNewPassword = $event"/>
			<span v-if="errorText" class="errorText">{{ errorText }}</span>
			<span v-else-if="successText" class="successText">{{ successText }}</span>
			<button v-else @click="resetPassword">SUBMIT</button>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
import zxcvbn from 'zxcvbn'
import { mapMutations } from 'vuex'

import InputField from '@/components/ui/InputField'

export default {
	name: 'PageUpdatePassword',
	components: { InputField },
	data: function () {
		return {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			errorText: '',
			successText: '',
		}
	},
	methods: {
		...mapMutations([
			'mutate'
		]),
		async resetPassword () {
			if (this.newPassword !== this.confirmNewPassword) {
				this.errorText = 'Passwords do not match'
				setTimeout(() => {
					this.errorText = ''
				}, 2000)
			} else if (zxcvbn(this.newPassword).score < 3) {
				this.errorText = 'Please create a stronger password'
				setTimeout(() => {
					this.errorText = ''
				}, 2000)
			} else {
				try {
					await axios({
						method: 'put',
						url: `${process.env.VUE_APP_API_URL}/api/v1/auth/updatepassword`,
						withCredentials: true,
						data: {
							currentPassword: this.oldPassword,
							newPassword: this.newPassword,
						},
					})                   

					this.successText = 'Password Reset!'
					setTimeout(() => {
						this.$router.push('/')
					}, 4000)
				} catch (err) {
					console.error(err)
					if (err.msg) {
						this.errorText = err.msg
					} else {
						this.errorText = 'Unknown Error. Please try again.'
					}
					setTimeout(() => {
						this.errorText = ''
					}, 4000)
				}
			}
		},
	}
}
</script>

<style lang="less">
.newPasswordContainer {
	height: 100%;
	display: -ms-grid;
	display: grid;

	.newPasswordDiv {
		display: -ms-grid;
		display: grid;
		width: 50%;
		height: 65%;
		margin: 0 auto;
		-ms-grid-row-align: center;
		-ms-grid-column-align: center;
		place-self: center;
		align-self: center;
		justify-self: center;
		border-radius: 5px;
		background-color: white;

		> div {
			padding: 1rem;
		}

		.newPasswordFormDiv {
			display: -ms-grid;
			display: grid;
			grid-template-rows: 10% 25% 25% 25% 15%;

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

		}
	}
}
</style>
