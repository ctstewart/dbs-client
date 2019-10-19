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

</style>