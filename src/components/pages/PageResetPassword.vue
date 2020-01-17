<template>
<div class="newPasswordContainer">
    <div class="newPasswordDiv">
        <div class="newPasswordFormDiv">
            <h2>New Password</h2>
            <input-field v-bind="{inputStyle: {initialInputType: 'password', label:'Password', placeholder:'password', meter:true}}" :value="password" v-on:value-changed="password = $event"/>
            <input-field v-bind="{inputStyle: {initialInputType: 'password', label:'Confirm Password', placeholder:'password', meter:false}}" :value="confirmPassword" v-on:value-changed="confirmPassword = $event"/>
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
    name: 'LoginForm',
    components: {InputField},
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
            } else if (zxcvbn(this.password).score < 3) {
                this.errorText = 'Please create a stronger password'
                setTimeout(() => {
                    this.errorText = ''
                    this.$router.push('/login')
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
                    if (error.msg) {
                        this.errorText = error.msg
                    } else {
                        this.errorText = 'Unknown Error. Please try again.'
                    }
                    setTimeout(() => {
                        this.errorText = ''
                    }, 4000)
                })
            }
        },
        saveTokenToLocalStorage: function (value) {
            const parsed = JSON.stringify(value)
            localStorage.setItem('jwt', parsed)
        }
    },
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