<template>
<div class="input-switch">
	<div>{{ label }}</div>
	<label class="switch">
		<input type="checkbox" :checked="value" @change="$emit('toggle')">
		<span class="slider"></span>
	</label>
</div>
</template>

<script>
export default {
	name: 'InputSwitch',
	props: ['label', 'value'],
}
</script>

<style lang="less" scoped>
.input-switch {
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	text-align: right;
}

.switch {
	-webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
	-moz-appearance: none; /* for firefox compatibility */
	appearance: none;
	font-size: 16px;
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
	justify-self: start;
	margin-left: 1rem;

	input {
		opacity: 0;
		width: 0;
		height: 0;

		&:checked + .slider {
			background-color: #2196F3;
		}

		&:focus + .slider {
			box-shadow: 0 0 1px #2196F3;
		}

		&:checked + .slider:before {
			-webkit-transform: translateX(26px);
			-ms-transform: translateX(26px);
			transform: translateX(26px);
		}
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: .4s;
		transition: .4s;

		&:before {
			position: absolute;
			content: "";
			height: 26px;
			width: 26px;
			left: 4px;
			bottom: 4px;
			background-color: white;
			-webkit-transition: .4s;
			transition: .4s;
		}
	}
}
</style>