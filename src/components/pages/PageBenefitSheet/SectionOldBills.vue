<template>
<div class="oldBills">
    <currency-input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" :value="parseFloat(oldPhoneBill)" @change="mutate({property: 'oldPhoneBill', with: $event.target.value})"/>
    <p>+</p>
    <currency-input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" :value="parseFloat(oldHomeSolution)" @change="mutate({property: 'oldHomeSolution', with: $event.target.value})"/>
    <p>=</p>
    <p>${{ oldTotal.toFixed(2) }}</p>
    <p>Old phone bill</p>
    <p></p>
    <p>Old home solutions</p>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('benefitSheet')

export default {
    name: 'SectionOldBills',
    computed: {
        ...mapState([
            'oldPhoneBill',
            'oldHomeSolution'
        ]),
        ...mapGetters([
            'oldTotal'
        ])
    },
    methods: {
        ...mapMutations([
            'mutate'
        ])
    }
}
</script>

<style>
.oldBills {
  display: -ms-grid;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 2fr;
  grid-template-rows: 1fr 1fr;
  -ms-grid-row-align: center;
  -ms-grid-column-align: center;
  place-items: center;
  align-items: center;
  justify-items: center;
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