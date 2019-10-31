<template>
<div class="main pullthru">
    <div class="pullthruColumn">
        <div v-for="(i, index) in connectedDevices.slice(0,4)" :key="i.id">
            <p id="textAlignRight">{{i.id}}:</p>
            <i class="fa fa-minus-circle fa-lg" aria-hidden="true" @click="decrementConnectedDevice(index)"></i>
            <p>{{i.value}}</p>
            <i class="fa fa-plus-circle fa-lg" aria-hidden="true" @click="incrementConnectedDevice(index)"></i>
        </div>
    </div>
    <div class="pullthruColumn">
        <div v-for="(i, index) in connectedDevices.slice(4,8)" :key="i.id">
            <p id="textAlignRight">{{i.id}}:</p>
            <i class="fa fa-minus-circle fa-lg" aria-hidden="true" @click="decrementConnectedDevice(index + 4)"></i>
            <p>{{i.value}}</p>
            <i class="fa fa-plus-circle fa-lg" aria-hidden="true" @click="incrementConnectedDevice(index + 4)"></i>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'SectionPullthru',
    computed: {
        ...mapState({
            connectedDevices (state) {
                return state[this.$route.params.vuexModule].connectedDevices
            }
        })
    },
    methods: {
        ...mapMutations({
            incrementConnectedDevice (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/incrementConnectedDevice`, payload)
            },
            decrementConnectedDevice (commit, payload) {
                return commit(`${this.$route.params.vuexModule}/decrementConnectedDevice`, payload)
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

.pullthru {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.pullthruColumn {
    display: grid;
    border: 1px solid white;
    margin: 0px 10px;
    padding: 10px;
    border-radius: 5%;
}

.pullthruColumn {
    grid-template-rows: 1fr 1fr 1fr 1fr;
    align-items: center;
}

.pullthruColumn div {
    display: -ms-grid;
    display: grid;
    grid-template-columns: 40% 20% 20% 20%;
    -ms-grid-row-align: center;
    -ms-grid-column-align: center;
    place-items: center;
    align-items: center;
    justify-items: center;
}

.pullthruColumn i:hover {
    cursor: pointer;
}
</style>
