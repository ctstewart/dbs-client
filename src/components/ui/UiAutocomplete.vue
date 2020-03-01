<template>
<div class="autocomplete" :class="{ 'positionRelative': focus === true }">
  <input type="text" v-model="search" @input="onChange($event)" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter" @keydown.esc="onEsc" @focus="focus = true; onChange($event)"/>
  <ul class="autocompleteResults" v-show="isOpen">
    <li class="autocompleteResult" v-for="(result, i) in results" :key="i" @click="setresult($event, result)" :class="{ 'is-active': i === arrowCounter }" @mouseover="handleMouseOver">
      {{result}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
	name: 'autocomplete',
	props: ['benefit'],

	data: function () {
		return {
			search: this.benefit,
			results: [],
			isOpen: false,
			focus: false,
			arrowCounter: -1,
			items: [
				'Protection from Damage, Loss, Theft', 'Advanced Setup', 'Better Battery', 'Better Camera', 'Bigger Screen', 'Higher Resolution', 'Wireless Charging', 'Vehicle Safety Service', 'Vehicle Diagnostics', 'Emergency Car Service', 'Fantastic Customer Service', 'Best Network Performance (RootMetrics)', 'Most Reliable Network (RootMetrics)', 'Unlimited Talk', 'Unlimited Text', 'Unlimited Data', '15GB High Speed Hotspot', '20GB High Speed Hotspot', 'Keep Your Same Phone Number', 'International Calling'
			]
		}
	},

	methods: {
		filterResults () {
			this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
		},
		onChange (event) {
			this.filterResults()
			if (this.results.length === 0) {
				this.isOpen = false
			} else if (this.results.length > 0) {
				this.isOpen = true
			}
			this.$emit('changeBenefit', this.search)
		},
		setresult (event, result) {
			this.isOpen = false
			this.search = result
			this.$emit('changeBenefit', result)
		},
		onArrowDown () {
			if (this.arrowCounter < this.results.length) {
				this.arrowCounter = this.arrowCounter + 1
			}
		},
		onArrowUp () {
			if (this.arrowCounter > -1) {
				this.arrowCounter = this.arrowCounter - 1
			}
		},
		onEnter () {
			this.search = this.results[this.arrowCounter]
			this.$emit('changeBenefit', this.results[this.arrowCounter])
			this.isOpen = false
			this.arrowCounter = -1
		},
		onEsc () {
			this.isOpen = false
			this.arrowCounter = -1
		},
		handleClickOutside (evt) {
			if (!this.$el.contains(evt.target)) {
				this.isOpen = false
				this.arrowCounter = -1
			}
		},
		handleMouseOver () {
			if (this.arrowCounter > -1) {
				this.arrowCounter = -1
			}
		}
	},
	computed: {
	},
	mounted () {
		document.addEventListener('click', this.handleClickOutside)
	},
	destroyed () {
		document.removeEventListener('click', this.handleClickOutside)
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
        width: 80%;
        -webkit-appearance: none;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid black;
        background-color: silver;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        color: black;

        @media print {
            font-size: 18px;
            background-color: lightgray;
        }

        &:focus {
            outline: none;
            border: 1px solid blue;
        }
    }

    .autocompleteResults {
        position: absolute;
        top: 100%;
        left: 10%;
        background-color: white;
        width: 80%;
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
                background-color: #4AAE9B;
                color: white;
            }
        }
    }
}
</style>
