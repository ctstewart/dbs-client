<template>
	<div class="benefits">
		<p class="benefitsTitle">New Plan Benefits</p>
		<ui-autocomplete
			v-for="(i, index) in benefits"
			:key="index"
			:benefit="i"
			:items="items"
			v-on:changeBenefit="mutateBenefits({ index, value: $event })"
			:autocompleteInputStyleObject="autocompleteInputStyleObject"
			:autocompleteResultsStyleObject="autocompleteResultsStyleObject"
		/>
	</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import UiAutocomplete from "@/components/ui/UiAutocomplete";
const { mapState, mapMutations } = createNamespacedHelpers("benefitSheet");

export default {
	name: "SectionBenefits",
	components: { UiAutocomplete },
	data() {
		return {
			items: [
				"Protection from Damage, Loss, Theft",
				"Advanced Setup",
				"Better Battery",
				"Better Camera",
				"Bigger Screen",
				"Higher Resolution",
				"Wireless Charging",
				"Vehicle Safety Service",
				"Vehicle Diagnostics",
				"Emergency Car Service",
				"Fantastic Customer Service",
				"Best Network Performance (RootMetrics)",
				"Most Reliable Network (RootMetrics)",
				"Unlimited Talk",
				"Unlimited Text",
				"Unlimited Data",
				"15GB High Speed Hotspot",
				"20GB High Speed Hotspot",
				"Keep Your Same Phone Number",
				"International Calling",
				"Disney+, Hulu, ESPN+",
				"Block Robocalls",
				"Wifi Security",
				"VPN",
				"Overnight Shipping",
				"Same-day Repair",
				"$29 Screen Repair",
				"$10 Screen Protector Replacements",
				"Consistent Bill",
				"Call Filter App",
				"Digital Secure App"
			],
			autocompleteInputStyleObject: {
				width: "80%",
				"border-bottom": "1px solid black",
				"background-color": "silver",
				"font-size": "16px",
				color: "black"
			},
			autocompleteResultsStyleObject: {
				left: "10%",
				width: "80%"
			}
		};
	},
	computed: {
		...mapState(["benefits"])
	},
	methods: {
		...mapMutations(["mutateBenefits"])
	}
};
</script>

<style lang="less" scoped>
.benefits {
	margin: 1%;
	border-radius: 5px;
	padding: 1%;
	background-color: silver;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 2fr 2fr 2fr;

	@media print {
		background-color: lightgray;
	}

	.benefitsTitle {
		margin: 0;
		font-size: 16px;
		grid-column: 1 / span 2;
		align-self: start;
		text-align: center;

		@media print {
			color: red;
		}
	}
}
</style>
