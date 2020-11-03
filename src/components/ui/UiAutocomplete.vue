<template>
	<div class="autocomplete" :class="{ positionRelative: focus === true }">
		<input
			type="text"
			v-model="search"
			:style="autocompleteInputStyleObject"
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
		<ul class="autocompleteResults" :style="autocompleteResultsStyleObject" v-show="isOpen">
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
export default {
	name: "autocomplete",
	props: ["benefit", "items", "autocompleteInputStyleObject", "autocompleteResultsStyleObject"],

	watch: {
		benefit (newValue) {
			this.search = newValue
		}
	},

	data: function() {
		return {
			search: this.benefit,
			results: [],
			isOpen: false,
			focus: false,
			arrowCounter: -1,
		};
	},

	methods: {
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
			this.$emit("changeBenefit", this.search)
		},
		setresult(event, result) {
			this.isOpen = false
			this.search = result
			this.$emit("changeBenefit", result)
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
			this.$emit("changeBenefit", this.results[this.arrowCounter])
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
.positionRelative {
	position: relative;
}

.autocomplete {
	display: grid;
	justify-items: center;
	align-items: center;

	input {
		-webkit-appearance: none;
		border-radius: 0;
		border: none;
		font-size: 12px;
		text-align: center;
		font-weight: bold;

		@media print {
			font-size: 18px;
			background-color: lightgray;
		}

		&:focus {
			outline: none;
		}
	}

	.autocompleteResults {
		position: absolute;
		top: 100%;
		background-color: white;
		align-self: start;
		padding: 0;
		margin: 0;
		border: 1px solid #eeeeee;
		height: 15rem;
		overflow: auto;
		z-index: 1;

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
