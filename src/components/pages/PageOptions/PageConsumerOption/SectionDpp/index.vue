<template>
<div class="main">
	<div class="container">
		<div class="main-row">
			<div class="device" v-for="(i, index) in dppValues" :key="i.id">
				<edit-device v-if="i.editing" :dppObject="i" :dppIndex="index"/>
				<display-device v-else :dppObject="i" :dppIndex="index"/>
			</div>
			<div class="addDpp"><i class="fas fa-plus-circle" @click="addDppValue"></i></div>
		</div>
	</div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import DisplayDevice from './DisplayDevice'
import EditDevice from './EditDevice'

export default {
	name: 'SectionDpp',
	components: { DisplayDevice, EditDevice },
	data() {
		return {
			componentKey: 0,
		}
	},
	computed: {
		...mapState({
			dppValues (state) {
				return state['consumer'][this.$route.params.vuexModule].dppValues
			},
		})
	},
	methods: {
		...mapMutations({
			addDppValue (commit) {
				return commit(`consumer/${this.$route.params.vuexModule}/addDppValue`)
			},
		}),
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
}

.container {
	margin: 0 .5rem;
	padding: .75rem 1.5rem;
	border: 1px solid white;
	border-radius: .5rem;
}

.main-row {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
	// display: flex;
	// justify-content: start;
	// flex-wrap: wrap;
	// row-gap: 1rem;
	// column-gap: 2rem;
}

.addDpp {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	height: 10em;
	width: 14em;

	> i {
		cursor: pointer;
		font-size: 20px;
	}
}
</style>
