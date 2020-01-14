<template>
<div class="newPasswordContainer">
    <div class="newPasswordDiv">
        <div class="newPasswordFormDiv">
            <h2>New Password</h2>
            <div>
                <p>Password</p>
                <input type="password" placeholder="password" v-model="password">
            </div>
            <div>
                <p>Confirm Password</p>
                <input type="password" placeholder="password" v-model="confirmPassword" @keyup.enter="resetPassword">
            </div>
            <span v-if="errorText !== ''" class="errorText">{{ errorText }}</span>
            <span v-else-if="successText !== ''" class="successText">{{ successText }}</span>
            <button v-else @click="resetPassword">SUBMIT</button>
        </div>
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

<style lang="less">


.newPasswordContainer {
    height: 100%;
    display: -ms-grid;
    display: grid;

    .newPasswordDiv {
        display: -ms-grid;
        display: grid;
        width: 40%;
        height: 50%;
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
    }
}
</style>