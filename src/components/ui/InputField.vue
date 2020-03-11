<template>
<div>
    <p>{{ inputStyle.label }}
        <i v-if="passwordHidden && inputStyle.initialInputType==='password'" @click="passwordHidden = !passwordHidden; inputType = 'text'" class="far fa-eye-slash"></i>
        <i v-if="!passwordHidden && inputStyle.initialInputType==='password'" @click="passwordHidden = !passwordHidden; inputType = 'password'" class="far fa-eye"></i>
    </p>
    <input v-if="!inputStyle.maskValue" :type="inputType" :placeholder="inputStyle.placeholder" :value="value" @input="$emit('value-changed', $event.target.value)" @keyup.enter="$emit('keyupEnter')">
    <input v-else :type="inputType" v-mask="inputStyle.maskValue" :placeholder="inputStyle.placeholder" :value="value" @input="$emit('value-changed', $event.target.value)" @keyup.enter="$emit('keyupEnter')">
    <meter v-if="inputStyle.meter" :value="passwordStrengthValue" max="4"></meter>
    <span id="passwordStrengthFeedback" v-if="inputStyle.meter">{{ passwordStrengthFeedback }}</span>
</div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import { mask } from 'vue-the-mask'

export default {
	name: 'InputPassword',
	directives: { mask },
	props: {
		inputStyle: {
			initialInputType: {
				validator: function (value) {
					// The value must match one of these strings
					return ['text', 'email', 'password'].indexOf(value) !== -1
				}
			},
			label: String,
			placeholder: String,
			meter: Boolean,
			maskValue: String
		},
		value: String

	},
	data () {
		return {
			passwordHidden: true,
			inputType: this.inputStyle.initialInputType,
			strength: {
				0: 'Worst',
				1: 'Bad',
				2: 'Weak',
				3: 'Good',
				4: 'Strong'
			}
		}
	},
	computed: {
		passwordStrengthValue () {
			if (this.inputStyle.initialInputType === 'password' && this.inputStyle.meter) {
				return zxcvbn(this.value).score
			} else {
				return 0
			}
		},
		passwordStrengthFeedback () {
			if (this.inputStyle.initialInputType === 'password' && this.inputStyle.meter && !this.value) {
				return 'Please enter a password'
			} else if (this.inputStyle.initialInputType === 'password' && this.inputStyle.meter && this.passwordStrengthValue < 3 && this.value) {
				return zxcvbn(this.value).feedback.suggestions[0]
			} else if (this.inputStyle.initialInputType === 'password' && this.inputStyle.meter && this.passwordStrengthValue === 3) {
				return 'Good!'
			} else if (this.inputStyle.initialInputType === 'password' && this.inputStyle.meter && this.passwordStrengthValue === 4) {
				return 'Great!'
			} else {
				return ''
			}
		}
	}
}
</script>

<style lang="less" scoped>
div {
    display: -ms-grid;
    display: grid;

    p {
        font-size: .9rem;
        margin: 0;
        padding-bottom: .5rem;
        align-self: end;
        font-weight: bold;

        i {
            margin-left: .25rem;
            cursor: pointer;
        }
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

    meter {
        /* Reset the default appearance
        -webkit-appearance: none;
            -moz-appearance: none;
                appearance: none; */

        width: 100%;
        height: 0.5em;

        /* Applicable only to Firefox */
        background: none;
        background-color: rgba(0, 0, 0, 0.1);

        &::-webkit-meter-bar {
            background: none;
            background-color: rgba(0, 0, 0, 0.1);
        }

        /* Webkit based browsers */
        &[value="1"]::-webkit-meter-optimum-value { background: red; }
        &[value="2"]::-webkit-meter-optimum-value { background: yellow; }
        &[value="3"]::-webkit-meter-optimum-value { background: orange; }
        &[value="4"]::-webkit-meter-optimum-value { background: green; }

        /* Gecko based browsers */
        &[value="1"]::-moz-meter-bar { background: red; }
        &[value="2"]::-moz-meter-bar { background: yellow; }
        &[value="3"]::-moz-meter-bar { background: orange; }
        &[value="4"]::-moz-meter-bar { background: green; }
    }

    #passwordStrengthFeedback {
        margin: 0;
        padding: 0;
        justify-self: start;
        align-self: start;
        font-size: 1rem;
        color: #1F596E;
    }
}
</style>
