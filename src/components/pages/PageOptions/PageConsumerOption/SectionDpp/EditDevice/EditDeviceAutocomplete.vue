<template>
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
				focus = true
				onChange($event)
			"
		/>
		<ul
			v-if="!deviceNameManual"
			class="autocompleteResults"
			v-show="isOpen"
		>
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
</template>

<script>
import axios from 'axios'

import { mapState, mapMutations } from 'vuex'

import EditDeviceAutocomplete from './EditDeviceAutocomplete'

export default {
	name: 'EditDeviceAutocomplete',
	props: ['deviceName', 'deviceNameManual', 'dppIndex'],
	components: { EditDeviceAutocomplete },

	watch: {
		deviceName(newValue) {
			this.search = newValue
		},
	},

	data() {
		return {
			items: [],
			search: '',
			results: [],
			isOpen: false,
			focus: false,
			arrowCounter: -1,
		}
	},
	async created() {
		this.search = this.deviceName

		if (this.devices.length == 0) {
			try {
				const token = await this.$auth.getTokenSilently()

				const response = await axios({
					method: 'get',
					url: `${process.env.VUE_APP_API_URL}/api/v1/devices`,
					headers: { Authorization: `Bearer ${token}` },
					withCredentials: true,
					params: {
						limit: 1000,
					},
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
			dppValues(state) {
				return state['consumer'][this.$route.params.vuexModule]
					.dppValues
			},
			devices(state) {
				return state.devices
			},
		}),
	},
	methods: {
		...mapMutations({
			mutateDeviceName(commit, payload) {
				return commit(
					`consumer/${
						this.$route.params.vuexModule
					}/mutateDeviceName`,
					payload
				)
			},
			mutateDpp(commit, payload) {
				return commit(
					`consumer/${this.$route.params.vuexModule}/mutateDpp`,
					payload
				)
			},
			mutateDevices(commit, devices) {
				return commit('mutate', { property: 'devices', with: devices })
			},
			// mutateDppLengthOptions(commit, payload) {
			// 	return commit(
			// 		`consumer/${
			// 			this.$route.params.vuexModule
			// 		}/mutateDppLengthOptions`,
			// 		payload
			// 	);
			// }
		}),
		updateDppValues(index, deviceName) {
			this.mutateDeviceName({ index, value: deviceName })

			const device = this.devices.find(i => {
				return i.name == deviceName
			})

			if (!device) {
				this.mutateDpp({ index, value: 0 })
			} else {
				this.mutateDpp({ index, value: device.fullRetail })
				// this.mutateDppLengthOptions({ index, value: device.dppLength })
			}
		},
		filterResults() {
			this.results = this.items.filter(
				item =>
					item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
			)
		},
		onChange(event) {
			this.filterResults()
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
		},
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside)
	},
	destroyed() {
		document.removeEventListener('click', this.handleClickOutside)
	},
}
</script>

<style lang="less" scoped>
.autocomplete {
	display: flex;

	input {
		border: none;
		outline: 1px solid grey;
		flex-grow: 1;
		@toggle-font-size: 14px;
		font-size: @toggle-font-size;
		height: 2.25em;
		text-indent: 0.5em;
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
