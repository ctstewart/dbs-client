<template>
<div class="input">
	<input-dropdown v-bind="{inputType: 'numberInput', label: 'Protection $', value: tmp}" v-on:value-changed="mutate({property: 'tmp', with: $event})"/>
	<input-dropdown v-bind="{inputType: 'numberDropdown', label: 'Phones in 2 year Contracts', value: twoyear, range: 11}" v-on:value-changed="mutate({property: 'twoyear', with: $event})"/>
	<input-dropdown v-bind="{inputType: 'numberDropdown', label: '$30 Basic Phones', value: basic, range: 11}" v-on:value-changed="mutate({property: 'basic', with: $event})"/>
	<input-dropdown v-bind="{inputType: 'numberDropdown', label: 'Number of Activation Fees', value: numberOfNewDevices, range: 11}" v-on:value-changed="mutate({property: 'numberOfNewDevices', with: $event})"/>
	<input-dropdown v-bind="{inputType: 'numberInput', label: 'Other', value: otherCost}" v-on:value-changed="mutate({property: 'otherCost', with: $event})"/>
	<input-switch v-bind="{label: 'LTE Home Internet', value: lteHomeInternet}" v-on:toggle="toggle('lteHomeInternet')"/>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import InputDropdown from '@/components/input/InputDropdown'
import InputSwitch from '@/components/input/InputSwitch'

export default {
	name: 'TmpAndMisc',
	components: { InputDropdown, InputSwitch },
	computed: {
		...mapState({
			tmp (state) {
				return state['consumer'][this.$route.params.vuexModule].tmp
			},
			twoyear (state) {
				return state['consumer'][this.$route.params.vuexModule].twoyear
			},
			basic (state) {
				return state['consumer'][this.$route.params.vuexModule].basic
			},
			numberOfNewDevices (state) {
				return state['consumer'][this.$route.params.vuexModule].numberOfNewDevices
			},
			otherCost (state) {
				return state['consumer'][this.$route.params.vuexModule].otherCost
			},
			lteHomeInternet (state) {
				return state['consumer'][this.$route.params.vuexModule].lteHomeInternet
			},
		})
	},
	methods: {
		...mapMutations({
			mutate (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutate`, payload)
			},
			toggle (commit, property) {
				return commit(`consumer/${this.$route.params.vuexModule}/toggle`, property)
			}
		})
	}
}
</script>

<style lang="less" scoped>
.input {
	border: 1px solid white;
	border-radius: 10px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	align-items: center;
	justify-items: end;
	padding: .5rem;

	> div {
		font-size: 14px;
		width: 100%;
		text-align: right;
	}
}
</style>
