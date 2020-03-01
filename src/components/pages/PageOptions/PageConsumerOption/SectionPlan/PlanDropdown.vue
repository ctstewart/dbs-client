<template>
<div class="dropdownAndButtons">
    <select id="dropdown" @change="toggleOptionsType($route.params.vuexModule)">
        <option default>Consumer</option>
        <option>Business</option>
    </select>
    <select id="dropdown" :value="chosenPlan" @change="mutate({property: 'chosenPlan', with: $event.target.value})">
        <option>Unlimited</option>
        <option v-for="i in oldUnlimitedPlans" :key="i.id">{{i.id}}</option>
        <option v-for="i in tieredPlans" :key="i.id">{{i.id}}</option>
    </select>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'PlanDropdown',
	computed: {
		...mapState({
			chosenPlan (state) {
				return state['consumer'][this.$route.params.vuexModule].chosenPlan
			},
			oldUnlimitedPlans (state) {
				return state['consumer'][this.$route.params.vuexModule].oldUnlimitedPlans
			},
			tieredPlans (state) {
				return state['consumer'][this.$route.params.vuexModule].tieredPlans
			}
		})
	},
	methods: {
		...mapMutations({
			mutate (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutate`, payload)
			},
			toggleOptionsType (commit, payload) {
				commit('toggleOptionsType', payload)
				return this.$router.push(`/options/business/${this.$route.params.vuexModule}`)
			}
		})
	}
}
</script>

<style scoped>
select {
    -webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
    -moz-appearance: none; /* for firefox compatibility */
    appearance: none;
    background-color: rgba(255,255,255,0.8);
    width: 64px;
    height: 48px;
    border-radius: 5px;
    padding: 0;
    display: block;
    margin: 0 auto;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
}

.dropdownAndButtons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

#dropdown {
    width: 128px;
    /* place-self: center; */
    /* grid-area: 1 / 2 / 2 / 3; */
}

@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape)
{
    select {
        text-indent: 10%;
    }
}
</style>
