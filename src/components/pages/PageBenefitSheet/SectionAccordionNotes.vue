<template>
	<div class="billBreakdown">
		<div v-for="i in optionsComputed" :key="i.id" class="option">
			<div class="chosenPlanLabel">
				<p>{{ i.id }}:</p>
				<div>
					<span>{{ i.chosenPlanAndDevices }}</span>
				</div>
			</div>
			<textarea class="breakdown" v-model="i.notes"></textarea>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "SectionBillBreakdown",
	computed: {
		...mapState({
			optionsType(state) {
				return state.optionsType;
			},
			optionsComputed(state, getters) {
				return [
					{
						id: "Option 1",
						chosenPlan:
							state[this.optionsType.optionOne]["optionOne"]
								.chosenPlan,
						chosenPlanAndDevices:
							getters[
								`${this.optionsType.optionOne}/optionOne/chosenPlanAndDevices`
							],
						notes: ''
					},
					{
						id: "Option 2",
						chosenPlan:
							state[this.optionsType.optionTwo]["optionTwo"]
								.chosenPlan,
						chosenPlanAndDevices:
							getters[
								`${this.optionsType.optionTwo}/optionTwo/chosenPlanAndDevices`
							],
						notes:''
					}
				];
			}
		})
	}
};
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
			grid-template-columns: 1fr 7fr;
			margin: 0 1%;

			> p {
				font-size: 12px;
				color: red;
			}

			span {
				font-size: 12px;
			}
		}

		.breakdown {
			margin: 8px;
			display: grid;
			grid-template-rows: repeat(4, 1fr);
			border: 1px solid grey;
			padding: 12px;
			font-size: 16px;
			resize: none;
			overflow: hidden;
		}
	}
}
</style>
