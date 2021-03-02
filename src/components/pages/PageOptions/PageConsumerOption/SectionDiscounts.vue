<template>
<div class="section-discounts-container">
	<div class="autopay">
		<input-switch v-bind="{label: 'Autopay?', value: autopay}" v-on:toggle="toggle('autopay')"/>
	</div>
	<div class="visaCard">
		<input-switch v-bind="{label: 'Visa Card?', value: visaCard}" v-on:toggle="toggle('visaCard')"/>
	</div>
	<div class="common-discounts">
		<div @click="setCommonDiscount(false)">
			<input type="radio" name="commonDiscounts" id="noCommonDiscount" :checked="noCommonDiscount">
			<label for="noCommonDiscount">None</label>
		</div>
		<div v-if="isUnlimited" @click="setCommonDiscount('militaryNew')">
			<input type="radio" name="commonDiscounts" id="militaryNew" :checked="militaryNew">
			<label for="militaryNew">Military Discount (after 8/5/19)</label>
		</div>
		<div v-if="isUnlimited" @click="setCommonDiscount('militaryOld')">
			<input type="radio" name="commonDiscounts" id="militaryOld" :checked="militaryOld">
			<label for="militaryOld">Military Discount (before 8/5/19)</label>
		</div>
		<div v-if="isUnlimited" @click="setCommonDiscount('responderNew')">
			<input type="radio" name="commonDiscounts" id="responderNew" :checked="responderNew">
			<label for="responderNew">First Responder Discount (after 8/5/19)</label>
		</div>
		<div v-if="isUnlimited" @click="setCommonDiscount('responderOld')">
			<input type="radio" name="commonDiscounts" id="responderOld" :checked="responderOld">
			<label for="responderOld">First Responder Discount (before 8/5/19)</label>
		</div>
		<div v-if="isUnlimited" @click="setCommonDiscount('nurse')">
			<input type="radio" name="commonDiscounts" id="nurse" :checked="nurse">
			<label for="nurse">Nurse Discount</label>
		</div>
		<div v-if="isUnlimited" @click="setCommonDiscount('teacher')">
			<input type="radio" name="commonDiscounts" id="teacher" :checked="teacher">
			<label for="teacher">Teacher Discount</label>
		</div>
		<div v-if="!isUnlimited && !ifLoyalty55OrLoyaltyGo && !ifLoyalty55MixAndMatch2020" @click="setCommonDiscount('responderNew')">
			<input type="radio" name="commonDiscounts" id="militaryNew" :checked="militaryNew">
			<label for="militaryNew">Military Discount</label>
		</div>
		<div v-if="!isUnlimited && !ifLoyalty55OrLoyaltyGo && !if110UnlimitedOr65Unlimited && !ifLoyalty55MixAndMatch2020" @click="setCommonDiscount('responderNew')">
			<input type="radio" name="commonDiscounts" id="responderNew" :checked="responderNew">
			<label for="militaryOld">First Responder Discount</label>
		</div>
	</div>
	<div class="percentDiscount">
		<input-dropdown v-if="!ifLoyalty55OrLoyaltyGo && !ifLoyalty55MixAndMatch2020" v-bind="{inputType: 'numberDropdown', label: 'Other Discount %', value: discount, range: 31}" v-on:value-changed="mutate({property: 'discount', with: $event})"/>
	</div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import InputSwitch from '@/components/input/InputSwitch'
import InputDropdown from '@/components/input/InputDropdown'

export default {
	name: 'SectionDiscounts',
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
			nurse (state) {
				return state['consumer'][this.$route.params.vuexModule].nurse
			},
			teacher (state) {
				return state['consumer'][this.$route.params.vuexModule].teacher
			},
			visaCard (state) {
				return state['consumer'][this.$route.params.vuexModule].visaCard
			},
			discount (state) {
				return state['consumer'][this.$route.params.vuexModule].discount
			},
			isUnlimited (state, getters) {
				return getters[`consumer/${this.$route.params.vuexModule}/isUnlimited`]
			},
			noCommonDiscount (state, getters) {
				console.log(getters[`consumer/${this.$route.params.vuexModule}/noCommonDiscount`]);
				return getters[`consumer/${this.$route.params.vuexModule}/noCommonDiscount`]
			}
		}),
		ifLoyalty55MixAndMatch2020 () {
			return this.chosenPlan === 'loyalty55MixAndMatch2020'
		},
		ifLoyalty55OrLoyaltyGo () {
			return (this.chosenPlan === 'Loyalty 55+' || this.chosenPlan === 'Loyalty Go')
		},
		if110UnlimitedOr65Unlimited () {
			return (this.chosenPlan === '$110 Unlimited' || this.chosenPlan === '$65 Unlimited')
		},
	},
	methods: {
		...mapMutations({
			mutate (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutate`, payload)
			},
			toggle (commit, property) {
				return commit(`consumer/${this.$route.params.vuexModule}/toggle`, property)
			},
			setCommonDiscount (commit, property) {
				return commit(`consumer/${this.$route.params.vuexModule}/setCommonDiscount`, property)
			}
		})
	}
}
</script>

<style lang="less" scoped>
.section-discounts-container {
	display: grid;
	background-color: #387A77;
	margin: 0 1% 1% 1%;
	border-radius: 0 5px 5px 5px;
	color: white;
	padding: 3%;
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: 1fr 1fr;

	> div {
		margin: .5rem;
		border: 1px solid white;
		border-radius: 5px;
	}
}

.common-discounts {
	padding: 1rem;
	display: grid;
	grid-row: 1 / span 3;
	grid-column-start: 2;
	align-content: start;
	row-gap: 1rem;
	// grid-template-columns: 1fr 9fr;
	> div {
		display: grid;
		grid-template-columns: 1fr 9fr;
	}
}

.autopay, .visaCard, .percentDiscount {
	display: grid;
	align-content: center;
}
</style>