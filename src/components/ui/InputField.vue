<template>
<div>
    <p>{{ label }}</p>
    <input :type="inputType" :placeholder="placeholder" :value="value" @input="$emit('value-changed', $event.target.value)" @keyup.enter="$emit('keyupEnter')">
    <meter v-if="meter" :value="passwordStrengthValue" max="4"></meter>
    <span v-if="meter">{{ strength[passwordStrengthValue] }}</span>
</div>
</template>

<script>
export default {
    name: 'InputPassword',
    props: {
        inputType: {
            validator: function (value) {
                // The value must match one of these strings
                return ['text', 'email', 'password'].indexOf(value) !== -1
            },
        },
        label: String,
        placeholder: String,
        value: String,
        meter: Boolean
    },
    data() {
        return {
            strength: {
                0: "Worst",
                1: "Bad",
                2: "Weak",
                3: "Good",
                4: "Strong"
            }
        }
    },
    computed: {
        passwordStrengthValue() {
            if (this.inputType === 'password' && this.meter) {
                return zxcvbn(this.value).score
            } else {
                return 0
            }
        }
    }
}
</script>

<style lang="less" scoped>
div {
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

meter {
    /* Reset the default appearance 
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none; */

    margin: 0 auto 1em;
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
</style>