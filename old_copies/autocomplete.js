var autocomplete = {
    template: `
        <div :class="{ 'positionRelative': focus === true }">
            <input type="text" v-model="search" @input="onChange" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter" @keydown.esc="onEsc" @focus="focus = true" @blur="focus = false, isOpen = false"/>
            <ul class="autocompleteResults" v-show="isOpen">
                <li class="autocompleteResult" v-for="(result, i) in results" :key="i" @click="setResult(result)" :class="{ 'is-active': i === arrowCounter }" @mouseover="handleMouseOver">
                    {{result}}
                </li>
            </ul>
        </div>
    `,

    data: function () {
        return {
            search: '',
            results: [],
            isOpen: false,
            focus: false,
            arrowCounter: -1,
            items: [
                "Protection from Damage, Loss, Theft", "Advanced Setup", "Better Battery", "Better Camera", "Bigger Screen", "Higher Resolution", "Wireless Charging", "Vehicle Safety Service", "Vehicle Diagnostics", "Emergency Car Service", "Fantastic Customer Service", "Best Network Performance (RootMetrics)", "Most Reliable Network (RootMetrics)", "Unlimited Talk", "Unlimited Text", "Unlimited Data", "15GB High Speed Hotspot", "20GB High Speed Hotspot", "Keep Your Same Phone Number", "International Calling"
            ]
        }
    },

    methods: {
        filterResults() {
            this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        },
        onChange() {
            this.filterResults();
            if (this.results.length === 0) {
                this.isOpen = false;
            } else if (this.results.length > 0) {
                this.isOpen = true;
            }
        },
        setResult(result) {
            this.search = result;
            this.isOpen = false;
        },
        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > -1) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.results[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        onEsc() {
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        handleMouseOver() {
            if (this.arrowCounter > -1) {
                this.arrowCounter = -1;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside);
    }
}
