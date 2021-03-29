<template>
<div class="fullscreen-container">
	<div class="device-edit">
		<div class="dpp-total">Total: <span>${{ (dppObject.dpp / 100 - dppObject.credits / 100).toFixed(2) }} a month</span></div>
		<div class="input-group">
			<label for="deviceName">Device Name</label>
			<div class="toggle">
				<input type="radio" id="auto" name="deviceNameManual" value="false" v-model="deviceNameManual">
				<label :class="[ deviceNameManual ? 'text-inactive' : 'text-active' ]" for="auto" @click="deviceNameManual = false; updateDppValues(dppIndex, ''); search=''">Auto</label>
				<input type="radio" id="manual" name="deviceNameManual" value="true" v-model="deviceNameManual">
				<label :class="[ deviceNameManual ? 'text-active' : 'text-inactive' ]" for="manual" @click="deviceNameManual = true; updateDppValues(dppIndex, ''); search=''">Manual</label>
			</div>
			<edit-device-autocomplete
				:deviceName="dppObject.deviceName"
				:deviceNameManual="deviceNameManual"
				:dppIndex="dppIndex"
			/>
		</div>
		<div class="input-group">
			<label for="deviceName">DPP</label>
			<div class="toggle">
				<input type="radio" id="dppMonthly" name="dppTotalMode" value="false" v-model="dppTotalMode">
				<label :class="[ dppTotalMode ? 'text-inactive' : 'text-active' ]" for="dppMonthly" @click="dppTotalMode = false">Monthly</label>
				<input type="radio" id="dppTotal" name="dppTotalMode" value="true" v-model="dppTotalMode">
				<label :class="[ dppTotalMode ? 'text-active' : 'text-inactive' ]" for="dppTotal" @click="dppTotalMode = true">Total</label>
			</div>
			<input
				v-if="!dppTotalMode"
				type="number"
				class="input--short"
				:value="(dppObject.dpp / 100).toFixed(2)"
				@change="mutateDpp({ index: dppIndex, value: $event.target.value * 100 })"
				:disabled="deviceNameManual === false">
			<input
				v-else
				type="number"
				class="input--short"
				:value="(dppObject.dpp / 100 * 24).toFixed(2)"
				@change="mutateDpp({ index: dppIndex, value: $event.target.value / 24 * 100 })"
				:disabled="deviceNameManual === false">
		</div>
		<div class="input-group">
			<label for="deviceName">Credits</label>
			<div class="toggle">
				<input type="radio" id="creditsMonthly" name="creditsTotalMode" value="false" v-model="creditsTotalMode">
				<label :class="[ creditsTotalMode ? 'text-inactive' : 'text-active' ]" for="dppMonthly" @click="creditsTotalMode = false">Monthly</label>
				<input type="radio" id="creditsTotal" name="creditsTotalMode" value="true" v-model="creditsTotalMode">
				<label :class="[ creditsTotalMode ? 'text-active' : 'text-inactive' ]" for="creditsTotal" @click="creditsTotalMode = true">Total</label>
			</div>
			<input
				v-if="!creditsTotalMode"
				type="number"
				class="input--short"
				:value="(dppObject.credits / 100).toFixed(2)"
				@change="mutateCredits({ index: dppIndex, value: $event.target.value * 100 })"
			>
			<input
				v-else
				type="number"
				class="input--short"
				:value="(dppObject.credits / 100 * 24).toFixed(2)"
				@change="mutateCredits({ index: dppIndex, value: $event.target.value / 24 * 100 })"
			>
		</div>
		<div class="buttons">
			<button class="buttons__save" @click="closeEditDpp(dppIndex)">SAVE</button>
			<button class="buttons__delete" @click="removeDppValue(dppIndex)">DELETE</button>
		</div>
	</div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'

import EditDeviceAutocomplete from './EditDeviceAutocomplete'

export default {
	name: 'EditDevice',
	props: ['dppObject', 'dppIndex'],
	components: { EditDeviceAutocomplete },
	data() {
		return {
			deviceNameManual: false,
			dppTotalMode: false,
			creditsTotalMode: false,
		}
	},
	methods: {
		...mapMutations({
			mutateDpp (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutateDpp`, payload)
			},
			mutateCredits (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutateCredits`, payload)
			},
			removeDppValue (commit, payload) {
				this.componentKey += 1
				return commit(`consumer/${this.$route.params.vuexModule}/removeDppValue`, payload)
			},
			closeEditDpp (commit, index) {
				return commit(`consumer/${this.$route.params.vuexModule}/closeEditDpp`, index)
			},
		}),
	},
}
</script>

<style lang="less" scoped>
.fullscreen-container {
	box-sizing: border-box;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.5);
	padding: 5% 20%;

	* {
		box-sizing: border-box;
	}
}

.device-edit {
	height: 100%;
	width: 100%;
	overflow: scroll;
	background-color: darken(white, 5%);
	border-radius: 5px;
	color: black;
	padding: 2rem 6rem;
	text-align: left;
	font-size: 12px;
	display: flex;
	flex-direction: column;

	> * + * {
		margin-top: 4em;
	}
	// row-gap: 4em;
}

.input-group {
	display: flex;
	flex-direction: column;
	width: 100%;

	> * + * {
		margin-top: 1em;
	}
	// row-gap: 1em;

	> input {
		border: none;
		outline: 1px solid grey;
		flex-grow: 1;
		@toggle-font-size: 16px;
		font-size: @toggle-font-size;
		height: 2em;
		text-indent: .5em;
	}

	> .input--short {
		width: 40%;
	}
}

.dpp-total {
	font-size: 14px;

	> span {
		font-size: 16px;
		color: #387A77;
		font-weight: bold;
	}
}

.buttons {
	> button {
		cursor: pointer;
		padding: .5rem 1rem;
		margin-right: 1rem;
		border-radius: 5px;
		border: none;
		color: white;
	}

	> .buttons__save {
		font-weight: bold;
		background-color: #387A77;
	}

	> .buttons__delete {
		background-color: red;
	}

	&:after {
		content: "";
		display: block;
		height: 1rem;
		width: 100%;
	}
}

.toggle {
	display: flex;

	> input {
		position: absolute;
		opacity: 0;
		width: 0;
	}

	> label {
		border: 1px solid grey;
		padding: .5em 1em;
		cursor: pointer;
	}

	> .text-active {
		border: 1px solid #387A77;
		color: #387A77;
		font-weight: bold;
	}
}

.positionRelative {
	position: relative;
}
</style>
