<template>
<div class="input eightColumns">
    <div>TMP</div>
    <input :value="tmp" @change="mutate({property: 'tmp', with: $event.target.value})">
    <div>Phones in 2 year Contracts</div>
    <select :value="twoyear" @change="mutate({property: 'twoyear', with: $event.target.value})">
        <option v-for="i in 11" :key="i">{{i - 1}}</option>
    </select>
    <div>$30 Basic Phones</div>
    <select :value="basic" @change="mutate({property: 'basic', with: $event.target.value})">
        <option v-for="i in 11" :key="i">{{i - 1}}</option>
    </select>
    <div>Number Of New Devices</div>
    <select :value="numberOfNewDevices" @change="mutate({property: 'numberOfNewDevices', with: $event.target.value})">
        <option v-for="i in 11" :key="i">{{i - 1}}</option>
    </select>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'TmpAndMisc',
    computed: {
        ...mapState({
            tmp (state) {
                return state[this.$route.params.vuexModule].tmp
            },
            twoyear (state) {
                return state[this.$route.params.vuexModule].twoyear
            },
            basic (state) {
                return state[this.$route.params.vuexModule].basic
            },
            numberOfNewDevices (state) {
                return state[this.$route.params.vuexModule].numberOfNewDevices
            },
        })
    },
    methods: {
        ...mapMutations({
            mutate (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/mutate`, payload)
            }
        })
    }
}
</script>