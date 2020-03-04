<template>
<div class="option-plan">
    <div class="group-container two-column-width">
        <div class="group-dropdown">
            <select id="consumer-business-dropdown" @change="toggleOptionsType($route.params.vuexModule)">
                <option default>Business</option>
                <option>Consumer</option>
            </select>
        </div>
    </div>
    <div class="group-container two-column-width">
        <p class="group-container-label">Number of Phones</p>
        <div class="group-container-main four-columns">
            <input-dropdown v-for="(plan, index) in plans" :key="plan.id" v-bind="{inputType: 'numberInput', label: plan.id, value: plan.numberOfPhones}" v-on:value-changed="setPlans({index, value: parseInt($event)})"/>
        </div>
    </div>
    <div class="group-container">
        <p class="group-container-label">Discount</p>
        <div class="group-container-main one-column">
            <input-switch v-bind="{label: 'Military Discount', value: militaryDiscount.isActive}" v-on:toggle="toggleMilitaryDiscount"/>
        </div>
    </div>
    <div class="group-container">
        <p class="group-container-label">TMP/VZ Protect $</p>
        <div class="group-container-main one-column">
            <input-dropdown v-bind="{inputType: 'numberInput', label: 'TMP', value: tmp}" v-on:value-changed="mutate({property: 'tmp', with: $event})"/>
        </div>
    </div>
    <div class="group-container two-column-width">
        <p class="group-container-label">Misc.</p>
        <div class="group-container-main two-columns">
            <input-dropdown v-bind="{inputType: 'numberInput', label: 'Number of 2 Year Phones', value: twoYear.numberOfPhones}" v-on:value-changed="mutateTwoYear($event)"/>
            <input-dropdown v-bind="{inputType: 'numberInput', label: 'Number of Activation Fees', value: numberOfNewDevices}" v-on:value-changed="mutate({property: 'numberOfNewDevices', with: $event})"/>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import InputDropdown from '@/components/input/InputDropdown'
import InputSwitch from '@/components/input/InputSwitch'

export default {
	name: 'SectionPlan',
	components: { InputDropdown, InputSwitch },
	computed: {
		...mapState({
			plans (state) {
				return state['business'][this.$route.params.vuexModule].plans
			},
			militaryDiscount (state) {
				return state['business'][this.$route.params.vuexModule].militaryDiscount
			},
			tmp (state) {
				return state['business'][this.$route.params.vuexModule].tmp
			},
			twoYear (state) {
				return state['business'][this.$route.params.vuexModule].twoYear
			},
			numberOfNewDevices (state) {
				return state['business'][this.$route.params.vuexModule].numberOfNewDevices
			}
		})
	},
	methods: {
		...mapMutations({
			mutate (commit, payload) {
				return commit(`business/${this.$route.params.vuexModule}/mutate`, payload)
			},
			setPlans (commit, payload) {
				return commit(`business/${this.$route.params.vuexModule}/setPlans`, payload)
			},
			toggleMilitaryDiscount (commit) {
				return commit(`business/${this.$route.params.vuexModule}/toggleMilitaryDiscount`)
			},
			mutateTwoYear (commit, payload) {
				return commit(`business/${this.$route.params.vuexModule}/mutateTwoYear`, payload)
			},
			toggleOptionsType (commit, payload) {
				commit('toggleOptionsType', payload)
				return this.$router.push(`/options/consumer/${this.$route.params.vuexModule}`)
			}
		})
	}
}
</script>

<style lang="less" scoped>
.option-plan {
    background-color: #387A77;
    margin: 0 1% 1% 1%;
    border-radius: 0 5px 5px 5px;
    text-align: center;
    color: white;
    padding: 3%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 10% 1fr 1fr 1fr;

    .group-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: .5rem;

        > p {
            align-self: flex-start;
            margin-bottom: 0;
        }

        .group-dropdown {
            display: flex;
            align-items: center;

            #consumer-business-dropdown {
                -webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
                -moz-appearance: none; /* for firefox compatibility */
                appearance: none;
                background-color: rgba(255,255,255,0.8);
                width: 128px;
                height: 48px;
                border-radius: 5px;
                padding: 0;
                display: block;
                margin: 0 auto;
                text-align: center;
                text-align-last: center;
                font-size: 16px;
            }
        }

        .group-container-main {
            border: 1px solid white;
            padding: .25rem;
            height: 75%;
            border-radius: 10px;
            display: grid;
            align-items: center;
            justify-items: center;
        }

        .one-column {
            grid-template-columns: 1fr;
        }

        .two-columns {
            grid-template-columns: 1fr 1fr;
        }

        .four-columns {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        &:nth-of-type(3) {
            margin-right: 1rem;
        }

        &:nth-of-type(4) {
            margin-left: 1rem;
        }
    }
}

.two-column-width {
    grid-column: 1 / span 2;
}
</style>
