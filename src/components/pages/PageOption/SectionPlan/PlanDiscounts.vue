<template>
<div class="input eightColumns">
    <div :class="{'twoRows': isUnlimited}">Autopay?</div>
    <label class="switch" :class="{'twoRows': isUnlimited}">
        <input type="checkbox" :checked="autopay" @input="toggle('autopay')">
        <span class="slider"></span>
    </label>
    <div v-if="isUnlimited">Military Discount (after 8/5/19)</div>
    <label v-if="isUnlimited" class="switch">
        <input type="checkbox" :checked="militaryNew" @change="toggle('militaryNew')">
        <span class="slider"></span>
    </label>
    <div v-if="isUnlimited">First Responder Discount (after 8/5/19)</div>
    <label v-if="isUnlimited" class="switch">
        <input type="checkbox" :checked="responderNew" @change="toggle('responderNew')">
        <span class="slider"></span>
    </label>
    <div v-if="isUnlimited">Military Discount (before 8/5/19)</div>
    <label v-if="isUnlimited" class="switch">
        <input type="checkbox" :checked="militaryOld" @change="toggle('militaryOld')">
        <span class="slider"></span>
    </label>
    <div v-if="isUnlimited">First Responder Discount (before 8/5/19)</div>
    <label v-if="isUnlimited" class="switch">
        <input type="checkbox" :checked="responderOld" @change="toggle('responderOld')">
        <span class="slider"></span>
    </label>
    <div v-if="!isUnlimited">Military Discount</div>
    <label v-if="!isUnlimited" class="switch">
        <input type="checkbox" :checked="militaryNew" @change="toggle('militaryNew')">
        <span class="slider"></span>
    </label>
    <div v-if="!isUnlimited">First Responder Discount</div>
    <label v-if="!isUnlimited" class="switch">
        <input type="checkbox" :checked="responderNew" @change="toggle('responderNew')">
        <span class="slider"></span>
    </label>
    <div :class="{'otherDiscountLabel': isUnlimited}">Other Discount</div>
    <select :class="{'otherDiscountDropdown': isUnlimited}" :value="discount" @change="mutate({property: 'discount', with: $event.target.value})">
        <option v-for="i in 31" :key="i">{{i - 1}}%</option>
    </select>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'PlanDiscounts',
    computed: {
        ...mapState({
            autopay (state) {
                return state[this.$route.params.vuexModule].autopay
            },
            militaryNew (state) {
                return state[this.$route.params.vuexModule].militaryNew
            },
            responderNew (state) {
                return state[this.$route.params.vuexModule].responderNew
            },
            militaryOld (state) {
                return state[this.$route.params.vuexModule].militaryOld
            },
            responderOld (state) {
                return state[this.$route.params.vuexModule].responderOld
            },
            discount (state) {
                return state[this.$route.params.vuexModule].discount
            },
            isUnlimited (state, getters) {
                return getters[`${this.$route.params.vuexModule}/isUnlimited`]
            }
        })
    },
    methods: {
        ...mapMutations({
            mutate (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/mutate`, payload)
            },
            toggle (commit, property) {
                return commit(`${this.$route.params.vuexModule}/toggle`, property)
            }
        })
    }
}
</script>