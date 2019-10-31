<template>
<div class="main dpp">
    <div class="dppColumn">
        <div>
            <input v-for="(i, index) in existingDPPValues" :key="index" type='tel' pattern="[0-9]*" step='0.01' placeholder="Existing DPP" :value="i.value" @change="mutateExistingDpp({index, value: $event.target.value})">
        </div>
        <div>
            <input v-for="(i, index) in existingCreditValues" :key="index" type='tel' pattern="[0-9]*" step='0.01' placeholder="Existing Credits" :value="i.value" @change="mutateExistingCredits({index, value: $event.target.value})">
        </div>
    </div>
    <div class="dppColumn">Coming Soon: Pricing and Ordering Sheet</div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'SectionDpp',
    computed: {
        ...mapState({
            existingDPPValues (state) {
                return state[this.$route.params.vuexModule].existingDPPValues
            },
            existingCreditValues (state) {
                return state[this.$route.params.vuexModule].existingCreditValues
            },
        })
    },
    methods: {
        ...mapMutations({
            mutateExistingDpp (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/mutateExistingDpp`, payload)
            },
            mutateExistingCredits (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/mutateExistingCredits`, payload)
            }
        })
    }
}
</script>

<style scoped>
.main {
    background-color: #387A77;
    margin: 0 1% 1% 1%;
    border-radius: 0 5px 5px 5px;
    text-align: center;
    color: white;
    padding: 3%;
}

.dpp {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.dppColumn {
    display: grid;
    border: 1px solid white;
    margin: 0px 10px;
    padding: 10px;
    border-radius: 5%;
}

.dppColumn {
    grid-template-columns: 1fr 1fr;
}

.dppColumn div {
    margin: 0 5px;
    display: -ms-grid;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    -ms-grid-row-align: center;
    -ms-grid-column-align: center;
    place-items: center;
    align-items: center;
    justify-items: center;
}

.dpp input, select {
    -webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
    -moz-appearance: none; /* for firefox compatibility */
    appearance: none;
    background-color: rgba(255,255,255,0.8);
    width: 90%;
    height: 80%;
    border-radius: 5px;
    padding: 0;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
}

.dpp input::placeholder {
    font-size: 14px;
}
</style>
