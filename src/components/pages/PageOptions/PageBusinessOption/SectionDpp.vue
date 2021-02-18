<template>
<div class="main dpp">
	<div v-if="loading === false" class="dppColumn">
		<div class="dppRow" v-for="(i, index) in dppValues" :key="i.id">
			<div class="dropdown">
				<ui-autocomplete :benefit="i.deviceName" :items="items" :autocompleteInputStyleObject="autocompleteInputStyleObject" :autocompleteResultsStyleObject="autocompleteResultsStyleObject" v-on:changeBenefit="updateDppValues(index, $event)"/>
			</div>
			<input v-if="i.deviceName === 'Manual' || i.deviceName === ''" :value="(i.dpp / 100).toFixed(2)"  @change="mutateDpp({index, value: parseFloat($event.target.value) * 100})" />
			<div v-else class="dppAmount">{{ (i.dpp / 100).toFixed(2) }}</div>
			<input class="creditAmount" :value="(i.credits / 100).toFixed(2)" @change="mutateCredits({index, value: parseFloat($event.target.value) * 100})" />
			<i class="fas fa-minus-circle" @click="removeDppValue(index)"></i>
			<div class="dppLabels">Device Name</div>
			<div class="dppLabels">DPP</div>
			<div class="dppLabels">Credits</div>
		</div>
		<div class="addDpp"><i class="fas fa-plus-circle" @click="addDppValue"></i></div>
	</div>
	<div class="dppColumn">WIP</div>
</div>
</template>

<script>
import axios from 'axios'

import { mapState, mapMutations } from 'vuex'

import UiAutocomplete from '@/components/ui/UiAutocomplete'

export default {
	name: 'SectionDpp',
	components: { UiAutocomplete },
	data() {
		return {
			loading: true,
			items: [
				'Manual'
			],
			componentKey: 0,
            autocompleteInputStyleObject: {
                'width': '100%',
				'height': '100%',
                'border-bottom': '1px solid white',
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
				return state['business'][this.$route.params.vuexModule].dppValues
			},
			devices (state) {
				return state.devices
			}
		})
	},
	methods: {
		...mapMutations({
			mutateDeviceName (commit, payload) {
				return commit(`business/${this.$route.params.vuexModule}/mutateDeviceName`, payload)
			},
			mutateDpp (commit, payload) {
				return commit(`business/${this.$route.params.vuexModule}/mutateDpp`, payload)
			},
			mutateCredits (commit, payload) {
				return commit(`business/${this.$route.params.vuexModule}/mutateCredits`, payload)
			},
			addDppValue (commit) {
				return commit(`business/${this.$route.params.vuexModule}/addDppValue`)
			},
			removeDppValue (commit, payload) {
				this.componentKey += 1
				return commit(`business/${this.$route.params.vuexModule}/removeDppValue`, payload)
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

<style scoped>
.main {
	background-color: #387A77;
	margin: 0 1% 1% 1%;
	border-radius: 0 5px 5px 5px;
	text-align: center;
	color: white;
	padding: 3%;
}

.dpp {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.dppColumn {
	margin: 0px 10px;
	padding: 10px;
	border: 1px solid white;
	border-radius: 5%;
	display: grid;
	display: -ms-grid;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

.dppRow {
	display: grid;
	display: -ms-grid;
	grid-template-columns: 2fr 1fr 1fr 1fr;
	grid-template-rows: 80% 20%;
	-ms-grid-row-align: center;
	-ms-grid-column-align: center;
	place-items: center;
	align-items: center;
	justify-items: center;
}

.dppAmount {
	width: 100%;
}

.dpp input {
	font-family: inherit;
	font-size: 16px;
	padding: 0;
	width: 100%;
	border: none;
	border-bottom: 1px solid white;
	background-color: #387A77;
	color: white;
	-webkit-appearance: none;
	border-radius: 0;
	text-align: center;
}

.dpp input:focus {
	outline: none;
}

.dppAmount, .creditAmount {
	border-bottom: 1px solid white;
}

.dppLabels {
	font-size: 10px;
}

i:hover {
	cursor: pointer;
}

.addDpp {
	height: 100%;
	width: 100%;
	display: grid;
	align-content: center;
	justify-content: center;
}
</style>
