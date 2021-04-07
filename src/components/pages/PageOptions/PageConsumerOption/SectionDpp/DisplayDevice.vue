<template>
<div class="device-static">
	<div class="device-name"><span>{{ dppObject.deviceName }}</span></div>
	<div class="device-monthly-total"><span>${{ ((dppObject.fullRetail - dppObject.totalCredits) / dppObject.dppLength / 100).toFixed(2) }} a month</span></div>
	<div class="device-edit" @click="editDpp(dppIndex)"><span>EDIT</span></div>
	<div class="device-delete" @click="removeDppValue(dppIndex)"><span>DELETE</span></div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	name: 'DisplayDevice',
	props: ['dppObject', 'dppIndex'],
	methods: {
		...mapMutations({
			editDpp (commit, index) {
				return commit(`consumer/${this.$route.params.vuexModule}/editDpp`, index)
			},
			removeDppValue (commit, index) {
				return commit(`consumer/${this.$route.params.vuexModule}/removeDppValue`, index)
			}
		}),
	}
}
</script>

<style lang="less" scoped>
.device-static {
	display: grid;
	font-size: 12px;
	color: #387A77;
	background: white;
	border-radius: 10px;
	height: 10em;
	width: 14em;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 2fr 1.5fr 2fr;

	> * {
		height: 100%;
		display: grid;
		align-items: center;
	}
}

.device-name {
	display: grid;
	align-items: center;
	border-bottom: 1px solid #BDBDBD;
}

.device-name,
.device-monthly-total {
	grid-column: 1 / span 2;
}

.device-monthly-total {
	font-weight: bold;
	font-size: 1.2em;
	border-bottom: 1px solid black;
}

.device-edit,
.device-delete {
	cursor: pointer;
}

.device-edit {
	color: green;
	font-weight: bold;
	border-right: 1px solid black;
}

.device-delete {
	color: red;
}
</style>
