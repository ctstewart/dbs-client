<template>
<div class="main">
	<div v-if="loading === false" class="container">
		<div class="main-row" v-for="(i, index) in dppValues" :key="i.id">
			<div class="inner-column">
				<div class="column-label">Device Name</div>
				<div class="input-container">
					<ui-autocomplete :benefit="i.deviceName" :items="items" :autocompleteInputStyleObject="autocompleteInputStyleObject" :autocompleteResultsStyleObject="autocompleteResultsStyleObject" v-on:changeBenefit="updateDppValues(index, $event)"/>
				</div>
				<div class="toggle" @click="deviceNameManual = !deviceNameManual">
					<span class="toggle-background" :class="[ deviceNameManual ? 'background-active' : 'background-inactive' ]"></span>
					<div class="left" :class="[ deviceNameManual ? 'text-inactive' : 'text-active' ]"><span>Auto</span></div>
					<div class="right" :class="[ deviceNameManual ? 'text-alive' : 'text-inactive' ]"><span>Manual</span></div>
				</div>
			</div>
			<div class="inner-column">
				<div class="column-label">DPP</div>
				<div class="input-container">
					<input class="input" v-if="i.deviceName === 'Manual' || i.deviceName === ''" :value="(i.dpp / 100).toFixed(2)"  @change="mutateDpp({index, value: parseFloat($event.target.value) * 100})" />
					<div v-else class="input">{{ (i.dpp / 100).toFixed(2) }}</div>
				</div>
				<div class="toggle" @click="dppTotalMode = !dppTotalMode">
					<span class="toggle-background" :class="[ dppTotalMode ? 'background-active' : 'background-inactive' ]"></span>
					<div class="left" :class="[ dppTotalMode ? 'text-inactive' : 'text-active' ]"><span>Month</span></div>
					<div class="right" :class="[ dppTotalMode ? 'text-alive' : 'text-inactive' ]"><span>Total</span></div>
				</div>
			</div>
			<div class="inner-column">
				<div class="column-label">Credits</div>
				<div class="input-container">
					<input class="input" v-if="i.deviceName === 'Manual' || i.deviceName === ''" :value="(i.dpp / 100).toFixed(2)"  @change="mutateDpp({index, value: parseFloat($event.target.value) * 100})" />
					<div v-else class="input">{{ (i.dpp / 100).toFixed(2) }}</div>
				</div>
				<div class="toggle" @click="creditsTotalMode = !creditsTotalMode">
					<span class="toggle-background" :class="[ creditsTotalMode ? 'background-active' : 'background-inactive' ]"></span>
					<div class="left" :class="[ creditsTotalMode ? 'text-inactive' : 'text-active' ]"><span>Month</span></div>
					<div class="right" :class="[ creditsTotalMode ? 'text-alive' : 'text-inactive' ]"><span>Total</span></div>
				</div>
			</div>
			<div class="inner-column">
				<i class="fas fa-minus-circle" @click="removeDppValue(index)"></i>
			</div>
		</div>
		<!-- <div class="dppRow" v-for="(i, index) in dppValues" :key="i.id">
			<div class="dropdown">
				<ui-autocomplete :benefit="i.deviceName" :items="items" :autocompleteInputStyleObject="autocompleteInputStyleObject" :autocompleteResultsStyleObject="autocompleteResultsStyleObject" v-on:changeBenefit="updateDppValues(index, $event)"/>
			</div>
			<input class="autocomplete" v-if="i.deviceName === 'Manual' || i.deviceName === ''" :value="(i.dpp / 100).toFixed(2)"  @change="mutateDpp({index, value: parseFloat($event.target.value) * 100})" />
			<div v-else class="dppAmount">{{ (i.dpp / 100).toFixed(2) }}</div>
			<label class="switch">
				<input type="checkbox" :checked="value" @change="$emit('toggle')">
				<span class="slider"></span>
			</label>
			<input class="creditAmount autocomplete" :value="(i.credits / 100).toFixed(2)" @change="mutateCredits({index, value: parseFloat($event.target.value) * 100})" />
			<label class="switch">
				<input type="checkbox" :checked="value" @change="$emit('toggle')">
				<span class="slider"></span>
			</label>
			<i class="fas fa-minus-circle" @click="removeDppValue(index)"></i>
			<div class="dppLabels">Device Name</div>
			<div class="dppLabels">DPP</div>
			<div class="dppLabels">Total?</div>
			<div class="dppLabels">Credits</div>
			<div class="dppLabels">Total?</div>
		</div>
		<div class="addDpp"><i class="fas fa-plus-circle" @click="addDppValue"></i></div> -->
	</div>
	<!-- <div class="dppColumn">WIP</div> -->
</div>
</template>

<script>
import axios from 'axios'

import { mapState, mapMutations } from 'vuex'

import UiAutocomplete from '@/components/ui/UiAutocomplete'
import InputSwitch from '@/components/input/InputSwitch'

export default {
	name: 'SectionDpp',
	components: { UiAutocomplete, InputSwitch },
	data() {
		return {
			loading: true,
			deviceNameManual: false,
			dppTotalMode: false,
			creditsTotalMode: false,
			items: [
				'Manual'
			],
			componentKey: 0,
            autocompleteInputStyleObject: {
                'width': '10rem',
				'height': '100%',
                'background-color': '#387A77',
                'font-size': '12px',
                'color': 'white'
            },
            autocompleteResultsStyleObject: {
				'font-size': '14px',
				'color': 'black',
                'width': '100%'
            }
		}
	},
	async created() {
		console.log(this.devices.length);
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
		}
	}
}
</script>

<style lang="less" scoped>
.main {
	background-color: #387A77;
	margin: 0 1% 1% 1%;
	border-radius: 0 5px 5px 5px;
	text-align: center;
	color: white;
	padding: 1rem;
	display: grid;
	/* padding: 3%; */
}

.container {
	margin: 0 .5rem;
	padding: .75rem 1.5rem;
	border: 1px solid white;
	border-radius: .5rem;
}

.main-row {
	display: flex;
	justify-content: space-evenly;
	// border: 1px solid red;
}

.inner-column {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	// border: 1px solid red;
}

.column-label {
	// margin-top: .5rem;
	font-size: 10px;
}

.input-container {
	// border-bottom: 1px solid white;
	margin: 1rem;
}

.input {
	-webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
	-moz-appearance: none; /* for firefox compatibility */
	appearance: none;
	border: none;
	text-align: center;
	text-align-last: center;
	background-color: #387A77;
	color: white;
	width: 10rem;
	font-size: 16px;
}

.toggle {
	background: white;
	height: 2rem;
	width: 8rem;
	display: flex;
	font-size: 12px;
	position: relative;
	cursor: pointer;

	.toggle-background {
		position: absolute;
		background: #387A77;
		width: 3.75rem;
		height: 1.5rem;
		margin: .25rem;
		margin-right: 0;
	}

	.left, .right {
		color: white;
		width: 50%;
		margin: .25rem;
		display: grid;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}

	.left {
		margin-right: 0;
	}

	.right {
		margin-left: 0;
	}

	.background-active {
		transition: all .5s ease;
		transform: translateX(4rem);
		margin-left: 0;
		margin-right: .25rem;
	}

	.background-inactive {
		transition: all .5s ease;
	}

	.text-active {
		transition: all .5s ease;
		color: white;
	}

	.text-inactive {
		transition: all .5s ease;
		color: #387A77;
		font-weight: bold;
	}
}
</style>
