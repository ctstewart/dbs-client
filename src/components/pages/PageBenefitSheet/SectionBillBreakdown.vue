<template>
<div class="billBreakdown">
	<div v-for="i in optionsComputed" :key="i.id" class="option">
		<div class="chosenPlanLabel">
			<p>{{ i.id }}:</p>
			<div>{{ i.chosenPlan }}</div>
		</div>
		<div class="breakdown">
			<div>
				<p>Plan:</p>
				<div>${{ i.planTotal.toFixed(2) }}</div>
			</div>
			<div>
				<p>Protection/Other:</p>
				<div>${{ i.tmpTotal.toFixed(2) }}</div>
			</div>
			<div>
				<p>DPP:</p>
				<div>${{ i.dppTotal.toFixed(2) }}</div>
			</div>
			<div>
				<p>Total:</p>
				<div v-if="taxPercent > 0">${{ i.total.toFixed(2) }} (with {{ (taxPercent * 100).toFixed(3) }}% tax)</div>
				<div v-else>${{ i.total.toFixed(2) }} plus tax</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'SectionBillBreakdown',
	computed: {
		...mapState({
			optionsType (state) {
				return state.optionsType
			},
			taxPercent (state) {
				return state['benefitSheet'].taxPercent
			},
			optionsComputed (state, getters) {
				return [
					{
						id: 'Option 1',
						chosenPlan: state[this.optionsType.optionOne]['optionOne'].chosenPlan,
						planTotal: getters[`${this.optionsType.optionOne}/optionOne/planTotal`],
						tmpTotal: getters[`${this.optionsType.optionOne}/optionOne/tmpTotal`],
						dppTotal: getters[`${this.optionsType.optionOne}/optionOne/dppTotal`],
						total: getters[`${this.optionsType.optionOne}/optionOne/total`]
					},
					{
						id: 'Option 2',
						chosenPlan: state[this.optionsType.optionTwo]['optionTwo'].chosenPlan,
						planTotal: getters[`${this.optionsType.optionTwo}/optionTwo/planTotal`],
						tmpTotal: getters[`${this.optionsType.optionTwo}/optionTwo/tmpTotal`],
						dppTotal: getters[`${this.optionsType.optionTwo}/optionTwo/dppTotal`],
						total: getters[`${this.optionsType.optionTwo}/optionTwo/total`]
					}
				]
			}
		})
	}

}
</script>

<style lang="less" scoped>
.billBreakdown {
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin: 1%;

	.option {
		display: grid;
		grid-template-rows: 10% 90%;

		p {
			margin: 0;
			padding: 0;
		}

		> div {
			align-items: center;
		}

		.chosenPlanLabel {
			display: grid;
			grid-template-columns: 1fr 2fr;
			margin: 0 1%;

			> p {
				font-size: 12px;
				color: red;
			}
		}

		.breakdown {
			display: grid;
			grid-template-rows: repeat(4, 1fr);
			border: 1px solid grey;

			p {
				font-size: 14px;
				justify-self: end;
				text-align: right;
			}

			> div {
				display: grid;
				justify-items: center;
				grid-template-columns: 1fr 3fr;
				margin: 0 1%;

				> div {
					margin: 0 5%;
					width: 60%;
					text-align: center;
					border-bottom: 1px solid black;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
