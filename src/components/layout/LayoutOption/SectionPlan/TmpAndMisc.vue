<template>
<div class="input eightColumns">
    <div>TMP</div>
    <select :value="tmp" @change="mutate({property: 'tmp', with: $event.target.value})">
        <option v-for="i in 201" :key="i">${{i - 1}}</option>
    </select>
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
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('optionsModule')

export default {
    name: 'TmpAndMisc',
    computed: {
        ...mapState([
            'tmp',
            'twoyear',
            'basic',
            'numberOfNewDevices'
        ])
    },
    methods: {
        ...mapMutations([
            'mutate'
        ])
    }
}
</script>