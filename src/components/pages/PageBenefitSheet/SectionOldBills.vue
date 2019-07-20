<template>
<div class="oldBills">
    <input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" v-model="oldPhoneBill" @change="saveOldBillsToLocalStorage">
    <p>+</p>
    <input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" v-model="oldHomeSolution" @change="saveOldBillsToLocalStorage">
    <p>=</p>
    <p>${{ oldTotal.toFixed(2) }}</p>
    <p>Old phone bill</p>
    <p></p>
    <p>Old home solutions</p>
</div>
</template>

<script>
export default {
    name: 'SectionOldBills',
    data: function () {
        return {
            oldPhoneBill: null,
            oldHomeSolution: null
        }
    },

    created () {
        if (localStorage.getItem('oldBills')) {
            try {
                var localArray = []
                localArray = JSON.parse(localStorage.getItem('oldBills'))
                this.oldPhoneBill = localArray[0]
                this.oldHomeSolution = localArray[1]
            } catch (e) {
                localStorage.removeItem('oldBills')
            }
        }
    },

    methods: {
        saveOldBillsToLocalStorage: function () {
            var localArray = [this.oldPhoneBill, this.oldHomeSolution]
            const parsed = JSON.stringify(localArray)
            localStorage.setItem('oldBills', parsed)
        }
    },

    computed: {
        oldTotal: function () {
            var localTotal = 0
            if (this.oldPhoneBill !== null && !isNaN(parseFloat(this.oldPhoneBill))) {
                localTotal += parseFloat(this.oldPhoneBill)
            }
            if (this.oldHomeSolution !== null && !isNaN(parseFloat(this.oldHomeSolution))) {
                localTotal += parseFloat(this.oldHomeSolution)
            }
            this.$emit('old-total-changed', localTotal)
            return localTotal
        }
    }
}
</script>

<style>
.oldBills {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  place-items: center;
}

.oldBills > input {
  margin: 1% 5%;
  font-size: 16px;
  -webkit-appearance: none;
  border: none;
  border: 1px solid grey;
  background-color: white;
  width: 128px;
  height: 32px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.oldBills > input:focus {
    outline: none;
    border: 1px solid blue;
    border-radius: 5px;
}

.oldBills > p:nth-child(5) {
  font-weight: bold;
}

.oldBills > p:nth-child(n+6) {
    font-size: .7rem;
    align-self: start;
    margin-top: .1rem;
    font-weight: normal;
}
</style>