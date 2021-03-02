<template>
<div class="plan-container">
	<plan-dropdown/>
	<span>Number of Phones (exclude $30 basic phones)</span>
	<number-of-phones/>
	<span>Protection and Misc.</span>
	<tmp-and-misc/>
</div>
</template>

<script>
import PlanDropdown from './PlanDropdown'
import NumberOfPhones from './NumberOfPhones'
import TmpAndMisc from './TmpAndMisc'

export default {
	name: 'SectionPage',
	components: { PlanDropdown, NumberOfPhones, TmpAndMisc }
}
</script>

<style lang="less" scoped>
.plan-container {
	display: grid;
	background-color: #387A77;
	margin: 0 1% 1% 1%;
	border-radius: 0 5px 5px 5px;
	color: white;
	padding: 1rem;

	> span {
		text-align: left;
		align-self: end;
	}
}
</style>
