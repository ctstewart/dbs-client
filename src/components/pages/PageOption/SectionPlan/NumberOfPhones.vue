<template>
<div v-if="isUnlimited" class="input fiveColumns">
    <div class='twoColumns' v-for="(plan, index) in mixAndMatchNumberOfPhonesAndId" :key="plan.id">
        <div>{{plan.id}}</div>
        <select :value="plan.numberOfPhones" @change="setMixAndMatchPlans({index, value: parseInt($event.target.value)})">
            <option v-for="i in 11" :key="i">{{i - 1}}</option>
        </select>
    </div>
</div>
<div v-else-if="!isUnlimited" class="input threeColumns">
    <div class='twoColumns middle'>
        <div>Number of Phones</div>
        <select :value="numberOfPhonesTieredAndOldUnlimited" @change="mutate({property: 'numberOfPhonesTieredAndOldUnlimited', with: $event.target.value})">
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
        ...mapState({
            numberOfPhonesTieredAndOldUnlimited (state) {
                return state[this.$route.params.vuexModule].numberOfPhonesTieredAndOldUnlimited
            },
            isUnlimited (state, getters) {
                return getters[`${this.$route.params.vuexModule}/isUnlimited`]
            },
            mixAndMatchNumberOfPhonesAndId (state, getters) {
                return getters[`${this.$route.params.vuexModule}/mixAndMatchNumberOfPhonesAndId`]
            }
        }),
    },
    methods: {
        ...mapMutations({
            mutate (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/mutate`, payload)
            },
            setMixAndMatchPlans (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/setMixAndMatchPlans`, payload)
            }
        })
    }
}
</script>