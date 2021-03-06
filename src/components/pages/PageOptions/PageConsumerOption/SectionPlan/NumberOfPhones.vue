<template>
	<div v-if="isUnlimited" class="number-of-phones-unlimited">
		<div class="row">
			<input-dropdown
				v-for="(plan, index) in mixAndMatch3NumberOfPhonesAndId"
				:key="plan.id"
				v-bind="{inputType: 'numberDropdown', label: plan.id, value: plan.numberOfPhones, range: 11}"
				v-on:value-changed="setMixAndMatch3({index, value: parseInt($event)})"
			/>
		</div>
		<div class="divider"></div>
		<div class="row">
			<input-dropdown
				v-for="(plan, index) in mixAndMatch2NumberOfPhonesAndId"
				:key="plan.id"
				v-bind="{inputType: 'numberDropdown', label: plan.id, value: plan.numberOfPhones, range: 11}"
				v-on:value-changed="setMixAndMatch2({index, value: parseInt($event)})"
			/>
		</div>
		<div class="divider"></div>
		<div class="row">
			<input-dropdown
				v-for="(plan, index) in mixAndMatch1NumberOfPhonesAndId"
				:key="plan.id"
				v-bind="{inputType: 'numberDropdown', label: plan.id, value: plan.numberOfPhones, range: 11}"
				v-on:value-changed="setMixAndMatch1({index, value: parseInt($event)})"
			/>
		</div>
	</div>
	<div v-else-if="chosenPlan === 'loyalty55MixAndMatch2020'" class='number-of-phones-loyalty-2020-unlimited'>
		<input-dropdown
			v-for="(plan, index) in loyalty55MixAndMatch2020NumberOfPhonesAndId"
			:key="plan.id"
			v-bind="{inputType: 'numberDropdown', label: plan.id, value: plan.numberOfPhones, range: 7}"
			v-on:value-changed="setLoyalty55MixAndMatch2020Plans({index, value: parseInt($event)})"
		/>
	</div>
	<div v-else-if="chosenPlan === 'Loyalty 55+'" class="number-of-phones-not-unlimited">
		<input-dropdown
			v-bind="{inputType: 'numberDropdown', label: 'Number of Phones', value: numberOfPhonesTieredAndOldUnlimited, range: 5}"
			v-on:value-changed="mutate({property: 'numberOfPhonesTieredAndOldUnlimited', with: $event})"
		/>
	</div>
	<div v-else-if="chosenPlan === 'Loyalty Go'" class="number-of-phones-not-unlimited">
		<input-dropdown
			v-bind="{inputType: 'numberDropdown', label: 'Number of Phones', value: numberOfPhonesTieredAndOldUnlimited, range: 7}"
			v-on:value-changed="mutate({property: 'numberOfPhonesTieredAndOldUnlimited', with: $event})"
		/>
	</div>
	<div v-else-if="chosenPlan === '5GB Single'" class="number-of-phones-not-unlimited">
		<input-dropdown
			v-bind="{inputType: 'numberDropdown', label: 'Number of Phones', value: numberOfPhonesTieredAndOldUnlimited, range: 4}"
			v-on:value-changed="mutate({property: 'numberOfPhonesTieredAndOldUnlimited', with: $event})"
		/>
	</div>
	<div v-else class="number-of-phones-not-unlimited">
		<input-dropdown
			v-bind="{inputType: 'numberDropdown', label: 'Number of Phones', value: numberOfPhonesTieredAndOldUnlimited, range: 11}"
			v-on:value-changed="mutate({property: 'numberOfPhonesTieredAndOldUnlimited', with: $event})"
		/>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import InputDropdown from "@/components/input/InputDropdown";

export default {
	name: "NumberOfPhones",
	components: { InputDropdown },
	computed: {
		...mapState({
			chosenPlan(state) {
				return state["consumer"][this.$route.params.vuexModule].chosenPlan;
			},
			numberOfPhonesTieredAndOldUnlimited(state) {
				return state["consumer"][this.$route.params.vuexModule]
					.numberOfPhonesTieredAndOldUnlimited;
			},
			isUnlimited(state, getters) {
				return getters[`consumer/${this.$route.params.vuexModule}/isUnlimited`];
			},
			mixAndMatch3NumberOfPhonesAndId(state, getters) {
				return getters[
					`consumer/${this.$route.params.vuexModule}/mixAndMatch3NumberOfPhonesAndId`
				];
			},
			mixAndMatch2NumberOfPhonesAndId(state, getters) {
				return getters[
					`consumer/${this.$route.params.vuexModule}/mixAndMatch2NumberOfPhonesAndId`
				];
			},
			mixAndMatch1NumberOfPhonesAndId(state, getters) {
				return getters[
					`consumer/${this.$route.params.vuexModule}/mixAndMatch1NumberOfPhonesAndId`
				];
			},
			loyalty55MixAndMatch2020NumberOfPhonesAndId(state, getters) {
				return getters[
					`consumer/${this.$route.params.vuexModule}/loyalty55MixAndMatch2020NumberOfPhonesAndId`
				];
			}
		})
	},
	methods: {
		...mapMutations({
			mutate(commit, payload) {
				return commit(
					`consumer/${this.$route.params.vuexModule}/mutate`,
					payload
				)
			},
			setMixAndMatch3(commit, payload) {
				return commit(
					`consumer/${this.$route.params.vuexModule}/setMixAndMatch3`,
					payload
				)
			},
			setMixAndMatch2(commit, payload) {
				return commit(
					`consumer/${this.$route.params.vuexModule}/setMixAndMatch2`,
					payload
				)
			},
			setMixAndMatch1(commit, payload) {
				return commit(
					`consumer/${this.$route.params.vuexModule}/setMixAndMatch1`,
					payload
				)
			},
			setLoyalty55MixAndMatch2020Plans(commit, payload) {
				return commit(
					`consumer/${this.$route.params.vuexModule}/setLoyalty55MixAndMatch2020Plans`,
					payload
				)
			}
		})
	}
};
</script>

<style lang="less" scoped>
.number-of-phones-unlimited,
.number-of-phones-not-unlimited,
.number-of-phones-loyalty-2020-unlimited {
	border: 1px solid white;
	border-radius: 10px;
	display: grid;
	align-items: center;
}

.number-of-phones-unlimited {
	> .row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		font-size: 14px;
		padding: .5rem;
		// border-bottom: 1px solid white;
	}

	> .divider {
		border-bottom: 1px solid white;
	}
}

.number-of-phones-loyalty-2020-unlimited {
	grid-template-columns: repeat(4, 1fr);
	font-size: 14px;
}

.number-of-phones-not-unlimited {
	justify-items: center;
}
</style>
