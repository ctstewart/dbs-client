<template>
<div class="plan-container">
	<plan-dropdown/>
	<span>Number of Phones (exclude $30 basic phones)</span>
	<number-of-phones/>
	<span>Discounts</span>
	<plan-discounts/>
	<span>TMP and Misc.</span>
	<tmp-and-misc/>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import PlanDropdown from './PlanDropdown'
import NumberOfPhones from './NumberOfPhones'
import PlanDiscounts from './PlanDiscounts'
import TmpAndMisc from './TmpAndMisc'

export default {
	name: 'SectionPage',
	components: { PlanDropdown, NumberOfPhones, PlanDiscounts, TmpAndMisc },
}
</script>

<style lang="less" scoped>
.plan-container {
	display: grid;
	background-color: #387A77;
	margin: 0 1% 1% 1%;
	border-radius: 0 5px 5px 5px;
	color: white;
	padding: 3%;

	> span {
		text-align: left;
		align-self: end;
	}
}
</style>
