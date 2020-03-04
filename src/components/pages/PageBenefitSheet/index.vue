<template>
<div class="BSContainer gradientBackground">
	<layout-sidebar/>
	<div class="print-info print-only">
		<div class="print-left">
			<span class="print-date print-only">Date: {{ `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}` }}</span>
			<span class="print-rep-name print-only">Rep: {{ `${$store.state.userInfo.firstName} ${$store.state.userInfo.lastName}` }}</span>
		</div>
		<div class="print-right">
			<!-- <span class="print-customer-name print-only">Guest Name: {{ guestName }}</span> -->
			<!-- <span class="print-customer-number print-only">Guest Number: {{ guestNumber }}</span> -->
		</div>
	</div>
	<div class="mainContent" :class="[ hamburgerStyle ? 'hamburgerStyle' : 'fullStyle' ]">
		<div class="titleBar">
			<div class="copyButton">
				<i class="fas fa-align-justify fa-2x" @click="hamburgerStyle = !hamburgerStyle"></i>
			</div>
			<p>Benefit Sheet</p>
			<div class="clearButton">
				<i class="far fa-trash-alt fa-2x" @click="resetState"></i>
			</div>
		</div>
		<section-benefits/>
		<section-old-bills/>
		<section-bill-breakdown v-show="!hamburgerStyle"/>
		<section-costs/>
	</div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import jwtExpCheck from '@/mixins/jwtExpCheck'

import LayoutSidebar from '@/components/layout/LayoutSidebar'
import SectionBenefits from './SectionBenefits'
import SectionOldBills from './SectionOldBills'
import SectionBillBreakdown from './SectionBillBreakdown'
import SectionCosts from './SectionCosts'
const { mapMutations } = createNamespacedHelpers('benefitSheet')

export default {
	name: 'PageBenefitSheet',
	mixins: [jwtExpCheck],
	components: { LayoutSidebar, SectionBenefits, SectionOldBills, SectionBillBreakdown, SectionCosts },
	data: function () {
		return {
			hamburgerStyle: false,
			guestName: '',
			guestNumber: ''
		}
	},
	methods: {
		...mapMutations([
			'resetState'
		])
	}
}
</script>

<style lang="less" scoped>
@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape)
{
	.main select {
		text-indent: 10%;
	}
}

.print-only {
	display: none;

	@media print {
		display: flex;
	}
}

.print-left,
.print-right {
	@media print {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
}

.displayNone {
	display: none !important;
}

.BSContainer {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 4fr;

	@media print {
		grid-template-columns: 1fr;
		grid-template-rows: 2.5rem auto;
	}

	.fullStyle {
		transition: all 1s;
	}

	.hamburgerStyle {
		grid-template-rows: 10% 45% 20% 25%;
		margin-top: 5%;
		margin-bottom: 5%;
		transition: all 1s;
	}

	.print-info {
		@media print {
			margin: 0 2%;
			display: flex;
			justify-content: space-between;
			font-size: 14px;
		}
	}

	.mainContent {
		display: grid;
		margin: 1%;
		background-color: rgba(255,255,255,.9);
		grid-template-rows: 8% 30% 10% 40% 12%;
		border-radius: 5px;

		@media print {
			margin: 2%;
			margin-top: .5rem;
			grid-template-rows: 35% 10% 40% 15%;
			border: 1px solid gray;
			border-radius: 5px;
		}

		.titleBar {
			padding: 0 3rem;
			margin: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: rgba(31,89,110,.75);
			color: #F6F6F6;
			font-weight: bold;
			border-bottom: 2px solid rgba(0,0,0,.5);
			border-radius: 5px 5px 0 0;

			@media print {
				display: none !important;
			}

			p {
				font-size: 24px;
			}

			i {
				cursor: pointer;
			}
		}
	}
}

@media print {

  .positionRelative {
	position: relative;
  }

  .option1 > .breakdown {
	border-radius: 5px 0 0 5px;
  }

  .option2 > .breakdown {
	border-left: 0;
	border-radius: 0 5px 5px 0;
  }

  .costs {
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin: 0 1% 1% 1%;
  }

  .costs > div {
	display: grid;
	grid-template-columns: 2fr 1fr 2fr;
	place-items: center;
	font-weight: bold;
  }

  .costs > div > input {
	margin: 1% 5%;
	font-size: 16px;
	-webkit-appearance: none;
	border: none;
	border: 1px solid grey;
	background-color: white;
	width: 96px;
	height: 32px;
	border-radius: 5px;
	font-size: 16px;
	text-align: center;
	color: black;
	font-weight: bold;
  }
}
</style>
