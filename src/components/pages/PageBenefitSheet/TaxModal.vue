<template>
<div class="new-changes-modal hide-on-print">
	<form class="modal-content">
        <span class="closeBtn" @click="$emit('close-modal')">&times;</span>
        <h2>Tax Percentage</h2>
        <input-field v-bind="{inputStyle: {initialInputType: 'number', label:'Tax Percent', placeholder:'7.325%', meter:false}}" :value="taxPercent * 100" v-on:value-changed="newPercent = $event"/>
        <button @click="saveTaxPercent">SAVE</button>
	</form>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import InputField from '@/components/ui/InputField'

export default {
	name: 'TaxModal',
    components: { InputField },
    data() {
        return {
            newPercent: 0
        }
    },
	computed: {
		...mapState({
			taxPercent (state) {
				return state['benefitSheet'].taxPercent
			}
		})
	},
	methods: {
		...mapMutations({
			mutate (commit, payload) {
				return commit(`benefitSheet/mutate`, payload)
			}
        }),
        saveTaxPercent () {
            this.$emit('close-modal')
            this.mutate({property: 'taxPercent', with: this.newPercent / 100})
        }
	}
}
</script>

<style lang="less" scoped>
.new-changes-modal {
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0,0,0,0.5);

	@media print {
		display: none;
	}

	.modal-content {
		background-color: #f4f4f4;
		margin: 3rem auto;
		padding: 1rem;
		width: 50%;
		min-width: 20rem;
		box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);

        .closeBtn {
            color: #ccc;
            float: right;
            font-size: 2rem;

            &:hover, &:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
        }

        > div {
            display: -ms-grid;
            display: grid;
            margin: 2rem 0;
        }

        p {
            font-size: .9rem;
            margin: 0;
            padding-bottom: .5rem;
            align-self: end;
            font-weight: bold;
        }

        select {
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

        button {
            align-self: center;
            justify-self: end;
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

        .error {
            color: red;
        }

        .msg {
            color: green;
        }
	}
}
</style>
