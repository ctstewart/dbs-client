<template>
<div class="fullscreen-container">
	<div class="device-edit">
		<div class="dpp-total">Total: <span>${{ (dppObject.dpp / 100 - dppObject.credits / 100).toFixed(2) }} a month</span></div>
		<div class="input-group">
			<label for="deviceName">Device Name</label>
			<div class="autocomplete" :class="{ positionRelative: focus === true }">
				<input
					type="text"
					v-model="search"
					@input="onChange($event)"
					@keydown.down="onArrowDown"
					@keydown.up="onArrowUp"
					@keydown.enter="onEnter"
					@keydown.esc="onEsc"
					@focus="
						focus = true;
						onChange($event);
					"
				/>
				<ul v-if="!deviceNameManual" class="autocompleteResults" v-show="isOpen">
					<li
						class="autocompleteResult"
						v-for="(result, i) in results"
						:key="i"
						@click="setresult($event, result)"
						:class="{ 'is-active': i === arrowCounter }"
						@mouseover="handleMouseOver"
					>
						{{ result }}
					</li>
				</ul>
			</div>
			<div class="toggle">
				<input type="radio" id="auto" name="deviceNameManual" value="false" v-model="deviceNameManual">
				<label :class="[ deviceNameManual ? 'text-inactive' : 'text-active' ]" for="auto" @click="deviceNameManual = false; updateDppValues(dppIndex, ''); search=''">Auto</label>
				<input type="radio" id="manual" name="deviceNameManual" value="true" v-model="deviceNameManual">
				<label :class="[ deviceNameManual ? 'text-active' : 'text-inactive' ]" for="manual" @click="deviceNameManual = true; updateDppValues(dppIndex, ''); search=''">Manual</label>
			</div>
		</div>
		<div class="input-group">
			<label for="deviceName">DPP</label>
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
			<div class="toggle">
				<input type="radio" id="dppMonthly" name="dppTotalMode" value="false" v-model="dppTotalMode">
				<label :class="[ dppTotalMode ? 'text-inactive' : 'text-active' ]" for="dppMonthly" @click="dppTotalMode = false">Monthly</label>
				<input type="radio" id="dppTotal" name="dppTotalMode" value="true" v-model="dppTotalMode">
				<label :class="[ dppTotalMode ? 'text-active' : 'text-inactive' ]" for="dppTotal" @click="dppTotalMode = true">Total</label>
			</div>
		</div>
		<div class="input-group">
			<label for="deviceName">Credits</label>
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
			<div class="toggle">
				<input type="radio" id="creditsMonthly" name="creditsTotalMode" value="false" v-model="creditsTotalMode">
				<label :class="[ creditsTotalMode ? 'text-inactive' : 'text-active' ]" for="dppMonthly" @click="creditsTotalMode = false">Monthly</label>
				<input type="radio" id="creditsTotal" name="creditsTotalMode" value="true" v-model="creditsTotalMode">
				<label :class="[ creditsTotalMode ? 'text-active' : 'text-inactive' ]" for="creditsTotal" @click="creditsTotalMode = true">Total</label>
			</div>
		</div>
		<div class="buttons">
			<button class="buttons__save" @click="closeEditDpp(dppIndex)">SAVE</button>
			<button class="buttons__delete" @click="removeDppValue(dppIndex)">DELETE</button>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'

import { mapState, mapMutations } from 'vuex'

export default {
	name: 'EditDevice',
	props: ['dppObject', 'dppIndex'],
	data() {
		return {
			deviceNameManual: false,
			dppTotalMode: false,
			creditsTotalMode: false,
			dppEdit: true,
			items: [],
			componentKey: 0,
			search: '',
			results: [],
			isOpen: false,
			focus: false,
			arrowCounter: -1,
		}
	},
	async created() {
		this.search = this.dppObject.deviceName

		if (this.devices.length == 0) {
			try {
				const response = await axios({
					method: 'get',
					url: `${process.env.VUE_APP_API_URL}/api/v1/devices`,
					withCredentials: true,
					params: {
						limit: 1000
					}
				})

				this.mutateDevices(response.data.data)

				response.data.data.forEach(i => {
					this.items.push(i.name)
				})

				this.loading = false
			} catch (err) {
				console.error(err)
				if (err.response.status === 401) {
					this.$router.push('/login')
				}
			}
		} else {
			this.devices.forEach(i => {
				this.items.push(i.name)
			})

			this.loading = false
		}
	},
	computed: {
		...mapState({
			dppValues (state) {
				return state['consumer'][this.$route.params.vuexModule].dppValues
			},
			devices (state) {
				return state.devices
			}
		})
	},
	methods: {
		...mapMutations({
			mutateDeviceName (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutateDeviceName`, payload)
			},
			mutateDpp (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutateDpp`, payload)
			},
			mutateCredits (commit, payload) {
				return commit(`consumer/${this.$route.params.vuexModule}/mutateCredits`, payload)
			},
			addDppValue (commit) {
				return commit(`consumer/${this.$route.params.vuexModule}/addDppValue`)
			},
			removeDppValue (commit, payload) {
				this.componentKey += 1
				return commit(`consumer/${this.$route.params.vuexModule}/removeDppValue`, payload)
			},
			mutateDevices (commit, devices) {
				return commit('mutate', { property: 'devices', with: devices })
			},
			editDpp (commit, index) {
				return commit(`consumer/${this.$route.params.vuexModule}/editDpp`, index)
			},
			closeEditDpp (commit, index) {
				return commit(`consumer/${this.$route.params.vuexModule}/closeEditDpp`, index)
			},
			removeDppValue (commit, index) {
				return commit(`consumer/${this.$route.params.vuexModule}/removeDppValue`, index)
			}
		}),
		updateDppValues(index, deviceName) {
			this.mutateDeviceName({ index, value: deviceName })

			const device = this.devices.find(i => {
				return i.name == deviceName
			})

			if (!device) {
				this.mutateDpp({ index, value: 0 })
			} else {
				this.mutateDpp({ index, value: device.fullRetail / 24 })
			}
		},
		filterResults() {
			this.results = this.items.filter(
				item =>
					item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
			)
		},
		onChange(event) {
			this.filterResults();
			if (this.results.length === 0) {
				this.isOpen = false
			} else if (this.results.length > 0) {
				this.isOpen = true
			}
			this.updateDppValues(this.dppIndex, this.search)
		},
		setresult(event, result) {
			this.isOpen = false
			this.search = result
			this.updateDppValues(this.dppIndex, result)
		},
		onArrowDown() {
			if (this.arrowCounter < this.results.length) {
				this.arrowCounter = this.arrowCounter + 1
			}
		},
		onArrowUp() {
			if (this.arrowCounter > -1) {
				this.arrowCounter = this.arrowCounter - 1
			}
		},
		onEnter() {
			this.search = this.results[this.arrowCounter]
			this.updateDppValues(this.dppIndex, this.results[this.arrowCounter])
			this.isOpen = false
			this.arrowCounter = -1
		},
		onEsc() {
			this.isOpen = false
			this.arrowCounter = -1
		},
		handleClickOutside(evt) {
			if (!this.$el.contains(evt.target)) {
				this.isOpen = false
				this.arrowCounter = -1
			}
		},
		handleMouseOver() {
			if (this.arrowCounter > -1) {
				this.arrowCounter = -1
			}
		}
	},
	mounted() {
		document.addEventListener("click", this.handleClickOutside)
	},
	destroyed() {
		document.removeEventListener("click", this.handleClickOutside)
	}
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
	row-gap: 4em;
}

.input-group {
	display: flex;
	flex-direction: column;
	width: 100%;
	row-gap: 1em;

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

.autocomplete {
	display: flex;

	input {
		border: none;
		outline: 1px solid grey;
		flex-grow: 1;
		@toggle-font-size: 14px;
		font-size: @toggle-font-size;
		height: 2.25em;
		text-indent: .5em;
	}

	.autocompleteResults {
		position: absolute;
		top: 110%;
		background-color: white;
		align-self: start;
		padding: 0;
		margin: 0;
		border: 1px solid grey;
		height: 15rem;
		overflow: auto;
		z-index: 1;
		width: 100%;

		.autocompleteResult {
			list-style: none;
			text-align: left;
			padding: 4px 2px;
			cursor: pointer;
			z-index: 1;

			&:hover,
			&.is-active {
				background-color: #4aae9b;
				color: white;
			}
		}
	}
}
</style>
