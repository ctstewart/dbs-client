<template>
<div class="costs">
    <div v-for="i in costsArray" :key="i.id">
        <input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" :value="parseFloat(i.value)" @change="mutate({property: i.mutate, with: $event.target.value})"/>
        <p>${{ i.differenceMonthly.toFixed(2) }}</p>
        <p>${{ i.fees * 40 }}</p>
        <p>Cost today</p>
        <p>Diff. monthly</p>
        <p>One-time fees</p>
    </div>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('business/benefitSheet')

export default {
    name: 'SectionCosts',
    computed: {
        ...mapState([
            'optionOneTodayCost',
            'optionTwoTodayCost'
        ]),
        ...mapGetters([
            'optionOneDifferenceMonthly',
            'optionTwoDifferenceMonthly'
        ]),
        costsArray () {
            return [
                {
                    id: 'Option 1',
                    value: this.optionOneTodayCost,
                    mutate: 'optionOneTodayCost',
                    differenceMonthly: this.optionOneDifferenceMonthly,
                    fees: this.$store.state['business']['optionOne'].numberOfNewDevices
                },
                {
                    id: 'Option 2',
                    value: this.optionTwoTodayCost,
                    mutate: 'optionTwoTodayCost',
                    differenceMonthly: this.optionTwoDifferenceMonthly,
                    fees: this.$store.state['business']['optionTwo'].numberOfNewDevices
                }
            ]
        }
    },
    methods: {
        ...mapMutations([
            'mutate'
        ])
    }
}
</script>

<style>
.costs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 1%;
    overflow: hidden;
}

.costs > div {
    display: -ms-grid;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    -ms-grid-row-align: center;
    -ms-grid-column-align: center;
    place-items: center;
    align-items: center;
    justify-items: center;
    font-weight: bold;
    margin: 0;
}

.costs > div > p:nth-child(n+4) {
    font-size: .7rem;
    align-self: start;
    margin: 0;
    margin-top: .1rem;
    font-weight: normal;
    text-align: center;
}

.costs > div > input {
    margin: 0;
    font-size: 16px;
    -webkit-appearance: none;
    border: none;
    border: 1px solid grey;
    background-color: white;
    width: 96px;
    height: 32px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    color: black;
    font-weight: bold;
}

.costs > div > input:focus {
    outline: none;
    border: 1px solid blue;
    border-radius: 5px;
}
</style>