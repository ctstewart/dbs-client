<template>
<div v-if="isUnlimited" class="number-of-phones-unlimited">
	<input-dropdown v-for="(plan, index) in mixAndMatchNumberOfPhonesAndId" :key="plan.id" v-bind="{inputType: 'numberDropdown', label: plan.id, value: plan.numberOfPhones, range: 11}" v-on:value-changed="setMixAndMatchPlans({index, value: parseInt($event)})"/>
</div>
<div v-else-if="!isUnlimited" class="number-of-phones-not-unlimited">
	<input-dropdown v-bind="{inputType: 'numberDropdown', label: 'Number of Phones', value: numberOfPhonesTieredAndOldUnlimited, range: 11}" v-on:value-changed="mutate({property: 'numberOfPhonesTieredAndOldUnlimited', with: $event})"/>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import InputDropdown from '@/components/input/InputDropdown'

export default {
	name: 'NumberOfPhones',
	components: { InputDropdown },
	computed: {
		...mapState({
			numberOfPhonesTieredAndOldUnlimited (state) {
				return state['consumer'][this.$route.params.vuexModule].numberOfPhonesTieredAndOldUnlimited
			},
			isUnlimited (state, getters) {
				return getters[`consumer/${this.$route.params.vuexModule}/isUnlimited`]
			},
			mixAndMatchNumberOfPhonesAndId (state, getters) {
				return getters[`consumer/${this.$route.params.vuexModule}/mixAndMatchNumberOfPhonesAndId`]
			}
		})
	},
	methods: {
		...mapMutations({
			mutate (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutate`, payload)
			},
			setMixAndMatchPlans (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/setMixAndMatchPlans`, payload)
			}
		})
	}
}
</script>

<style lang="less" scoped>
.number-of-phones-unlimited,
.number-of-phones-not-unlimited {
	border: 1px solid white;
	border-radius: 10px;
	display: grid;
	align-items: center;
}

.number-of-phones-unlimited {
	grid-template-columns: repeat(5, 1fr);

	div:nth-child(5n) {
		grid-row-end: span 2;
	}
}

.number-of-phones-not-unlimited {
	justify-items: center;
}
</style>
