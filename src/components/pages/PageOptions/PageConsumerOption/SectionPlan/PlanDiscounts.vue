<template>
<div class="plan-discounts-container" :class="{'one-column': ifLoyalty55OrLoyaltyGo, 'three-columns': if110UnlimitedOr65Unlimited, 'four-columns': !ifLoyalty55OrLoyaltyGo && !if110UnlimitedOr65Unlimited }">
	<input-switch v-bind="{label: 'Autopay?', value: autopay}" v-on:toggle="toggle('autopay')"/>
	<div v-if="isUnlimited" class="two-rows">
		<input-switch v-bind="{label: 'Military Discount (after 8/5/19)', value: militaryNew}" v-on:toggle="toggle('militaryNew')"/>
		<input-switch v-bind="{label: 'Military Discount (before 8/5/19)', value: militaryOld}" v-on:toggle="toggle('militaryOld')"/>
	</div>
	<input-switch v-else-if="!ifLoyalty55OrLoyaltyGo" v-bind="{label: 'Military Discount', value: militaryNew}" v-on:toggle="toggle('militaryNew')"/>
	<div v-if="isUnlimited" class="two-rows">
		<input-switch v-bind="{label: 'First Responder Discount (after 8/5/19)', value: responderNew}" v-on:toggle="toggle('responderNew')"/>
		<input-switch v-bind="{label: 'First Responder Discount (before 8/5/19)', value: responderOld}" v-on:toggle="toggle('responderOld')"/>
	</div>
	<input-switch v-else-if="!ifLoyalty55OrLoyaltyGo && !if110UnlimitedOr65Unlimited" v-bind="{label: 'First Responder Discount', value: responderNew}" v-on:toggle="toggle('responderNew')"/>
	<input-dropdown v-if="!ifLoyalty55OrLoyaltyGo" v-bind="{inputType: 'numberDropdown', label: 'Other Discount %', value: discount, range: 31}" v-on:value-changed="mutate({property: 'discount', with: $event})"/>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import InputSwitch from '@/components/input/InputSwitch'
import InputDropdown from '@/components/input/InputDropdown'

export default {
	name: 'PlanDiscounts',
	components: { InputSwitch, InputDropdown },
	computed: {
		...mapState({
			chosenPlan (state) {
				return state['consumer'][this.$route.params.vuexModule].chosenPlan
			},
			autopay (state) {
				return state['consumer'][this.$route.params.vuexModule].autopay
			},
			militaryNew (state) {
				return state['consumer'][this.$route.params.vuexModule].militaryNew
			},
			responderNew (state) {
				return state['consumer'][this.$route.params.vuexModule].responderNew
			},
			militaryOld (state) {
				return state['consumer'][this.$route.params.vuexModule].militaryOld
			},
			responderOld (state) {
				return state['consumer'][this.$route.params.vuexModule].responderOld
			},
			discount (state) {
				return state['consumer'][this.$route.params.vuexModule].discount
			},
			isUnlimited (state, getters) {
				return getters[`consumer/${this.$route.params.vuexModule}/isUnlimited`]
			}
		}),
		ifLoyalty55OrLoyaltyGo () {
			return (this.chosenPlan === 'Loyalty 55+' || this.chosenPlan === 'Loyalty Go')
		},
		if110UnlimitedOr65Unlimited () {
			return (this.chosenPlan === '$110 Unlimited' || this.chosenPlan === '$65 Unlimited')
		}
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
.plan-discounts-container {
	border: 1px solid white;
	border-radius: 10px;
	display: grid;

	.two-rows {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
}

.four-columns {
	grid-template-columns: repeat(4, 1fr);
}

.three-columns {
	grid-template-columns: repeat(3, 1fr);
}

.one-column {
	grid-template-columns: repeat(1, 1fr);
}
</style>
