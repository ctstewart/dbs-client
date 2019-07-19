<template>
<div class="benefits">
    <p class="benefitsTitle">New Plan Benefits</p>
    <ui-autocomplete v-for="(i, index) in benefits" :benefit="i" v-on:changeBenefit="updateBenefit(index, $event)"></ui-autocomplete>
</div>
</template>

<script>
import UiAutocomplete from '@/components/ui/UiAutocomplete'

export default {
    name: 'SectionBenefits',

    components: {
        UiAutocomplete
    },

    data: function () {
        return {
            benefits: ['', '', '', '', '', '']
        }
    },

    created () {
        if (localStorage.getItem('benefits')) {
            try {
                this.benefits = JSON.parse(localStorage.getItem('benefits'))
            } catch (e) {
                localStorage.removeItem('benefits')
            }
        }
    },

    methods: {
        updateBenefit: function (parentBenefitIndex, childBenefit) {
            console.log(this.benefits)
            this.benefits[parentBenefitIndex] = childBenefit
            this.saveBenefitsToLocalStorage()
            console.log(this.benefits)
        },
        saveBenefitsToLocalStorage: function () {
            const parsed = JSON.stringify(this.benefits)
            localStorage.setItem('benefits', parsed)
        }
    }

}
</script>

<style>
.benefits {
  margin: 1%;
  border-radius: 5px;
  padding: 1%;
  background-color: silver;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 2fr 2fr 2fr;
}

.benefitsTitle {
  margin: 0;
  font-size: 16px;
  grid-column: 1 / 3;
  align-self: start;
  text-align: center;
}

.benefits > div {
  display: grid;
  justify-items: center;
  align-items: center;
}

.benefits input {
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
}

.benefits input:focus {
    outline: none;
    border: 1px solid blue;
}
</style>