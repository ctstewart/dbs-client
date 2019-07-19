<template>
<div class="oldBills">
    <input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" v-model="oldPhoneBill">
    <p>+</p>
    <input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" v-model="oldHomeSolution">
    <p>=</p>
    <p>${{ oldTotal.toFixed(2) }}</p>
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

.oldBills > p:last-child {
  font-weight: bold;
}
</style>