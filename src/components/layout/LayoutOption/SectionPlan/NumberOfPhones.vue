<template>
<div v-if="!isUnlimited" class="input threeColumns">
    <div class='twoColumns middle'>
        <div>Number of Phones</div>
        <select>
            <option v-for="i in 11" :key="i">{{i - 1}}</option>
        </select>
    </div>
</div>
<div v-else-if="isUnlimited" class="input fiveColumns">
    <div class='twoColumns' v-for="plan in mixAndMatchNumberOfPhonesAndId" :key="plan.id">
        <div>{{plan.id}}</div>
        <select :value="plan.numberOfPhones" @change="setMixAndMatchPlans({id: plan.id, value: $event.target.value})">
            <option v-for="i in 11" :key="i">{{i - 1}}</option>
        </select>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'NumberOfPhones',
    computed: {
        ...mapState([
            'chosenPlan',
            'oldUnlimitedPlans',
            'tieredPlans'
        ]),
        ...mapGetters([
            'isUnlimited',
            'mixAndMatchNumberOfPhonesAndId'
        ])
    },
    methods: {
        ...mapMutations([
            'setMixAndMatchPlans'
        ])
    }
}
</script>

<style>
.input {
    /*align-self: center;*/
    border: 1px solid white;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
    justify-items: end;
}

.twoColumns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: end;
}

.threeColumns {
    grid-template-columns: repeat(3, 1fr);
}

.fourColumns {
    grid-template-columns: repeat(4, 1fr);
}

.fiveColumns {
    grid-template-columns: repeat(5, 1fr);
}

.fiveColumns :nth-child(5) {
    grid-area: 1 / 5 / 3 / 6;
}

.eightColumns {
    grid-template-columns: repeat(8, 1fr);
}

.input div {
    font-size: 14px;
    width: 100%;
    text-align: right;
}

select {
    -webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
    -moz-appearance: none; /* for firefox compatibility */
    appearance: none;
    background-color: rgba(255,255,255,0.8);
    width: 64px;
    height: 48px;
    border-radius: 5px;
    padding: 0;
    display: block;
    margin: 0 auto;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
}
</style>