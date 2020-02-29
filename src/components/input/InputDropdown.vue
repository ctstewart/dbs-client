<template>
<div class="input-dropdown-container">
	<div>{{ label }}</div>
	<select v-if="inputType === 'numberDropdown'" :value="value" @change="$emit('value-changed', $event.target.value)">
		<option v-for="i in range" :key="i">{{i - 1}}</option>
	</select>
	<input v-else-if="inputType === 'numberInput'" :value="value" @change="$emit('value-changed', $event.target.value)">
</div>
</template>

<script>
export default {
	name: 'InputDropdown',
	props: ['inputType', 'label', 'value', 'range']
}
</script>

<style lang="less" scoped>
.input-dropdown-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	text-align: right;

	select, input {
		-webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
		-moz-appearance: none; /* for firefox compatibility */
		appearance: none;
		background-color: rgba(255,255,255,0.8);
		width: 64px;
		height: 48px;
		border: none;
		border-radius: 5px;
		padding: 0;
		display: block;
		margin: 0 auto;
		text-align: center;
		text-align-last: center;
		font-size: 16px;
		justify-self: start;
		margin-left: 1rem;

		@media only screen
		and (min-device-width : 768px)
		and (max-device-width : 1024px)
		and (orientation : landscape)
		{
			text-indent: 10%;
		}
	}
}
</style>