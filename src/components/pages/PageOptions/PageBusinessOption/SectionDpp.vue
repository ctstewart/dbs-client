<template>
<div class="dpp">
    <div class="dppColumn">
        <span>DPP</span>
        <div class="new-value">
            <i class="fas fa-dollar-sign"></i>
            <input v-model="addDpp" v-on:keyup.enter="addExistingDpp(+(addDpp * 100))">
            <i class="fas fa-arrow-right" @click="addExistingDpp(+(addDpp * 100))"></i>
        </div>
        <div class="values">
            <div v-for="(i, index) in existingDPPValues" :key="index" class="existing-values">
                <div>{{index + 1}}: ${{ parseFloat(i / 100).toFixed(2) }}</div>
                <i class="fas fa-minus-circle" @click="removeExistingDpp(index)"></i>
            </div>
        </div>
    </div>
    <div class="dppColumn">
        <span>Monthly Credits</span>
        <div class="new-value">
            <i class="fas fa-dollar-sign"></i>
            <input v-model="addCredit" v-on:keyup.enter="addExistingCredit(addCredit * 100)">
            <i class="fas fa-arrow-right" @click="addExistingCredit(addCredit * 100)"></i>
        </div>
        <div class="values">
            <div v-for="(i, index) in existingCreditValues" :key="index" class="existing-values">
                <div>{{index + 1}}: ${{ parseFloat(i / 100).toFixed(2) }}</div>
                <i class="fas fa-minus-circle" @click="removeExistingCredit(index)"></i>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'SectionDpp',
    data() {
        return {
            addDpp: 0,
            addCredit: 0
        }
    },
    computed: {
        ...mapState({
            existingDPPValues (state) {
                return state['business'][this.$route.params.vuexModule].existingDPPValues
            },
            existingCreditValues (state) {
                return state['business'][this.$route.params.vuexModule].existingCreditValues
            },
        })
    },
    methods: {
        ...mapMutations({
            addExistingDpp (commit, payload) {
                this.addDpp = 0
                return commit(`business/${this.$route.params.vuexModule}/addExistingDpp`, payload)
            },
            removeExistingDpp (commit, payload) {
                return commit(`business/${this.$route.params.vuexModule}/removeExistingDpp`, payload)
            },
            addExistingCredit (commit, payload) {
                this.addCredit = 0
                return commit(`business/${this.$route.params.vuexModule}/addExistingCredit`, payload)
            },
            removeExistingCredit (commit, payload) {
                return commit(`business/${this.$route.params.vuexModule}/removeExistingCredit`, payload)
            }
        })
    }
}
</script>

<style lang="less" scoped>
.dpp {
    background-color: #387A77;
    margin: 0 1% 1% 1%;
    border-radius: 0 5px 5px 5px;
    text-align: center;
    color: white;
    padding: 3%;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .dppColumn {
        display: flex;
        flex-direction: column;
        border: 1px solid white;
        margin: 0px 10px;
        padding: 10px;
        border-radius: 5%;

        > span {
            text-decoration: underline;
        }

        > .new-value {
            margin: .5rem 0 .75rem;
            border: 1px solid white;
            border-radius: 5px;
            height: 2rem;
            width: 12rem;
            align-self: center;
            position: relative;

            > input {
                // visibility: hidden;
                background: none;
                border: 0;
                height: 1.5rem;
                position: absolute;
                left: 0;
                margin: .25rem 1.5rem 0;
                width: 8.5rem;
                color: white;
                font-size: 1rem;

                &:focus {
                    outline: none;
                }
            }

            > i {
                height: 1.5rem;
                width: 1rem;
                position: absolute;

            }

            > i.fa-arrow-right {
                right: 0;
                margin: .5rem .25rem 0 0;
                cursor: pointer;
            }

            > i.fa-dollar-sign {
                left: 0;
                margin: .5rem 0 0 .25rem;
            }
        }

        .values {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            // grid-auto-flow: column;

            .existing-values {
                margin: .5rem;
                display: flex;

                > div {
                    margin-right: .5rem;
                }

                > i {
                    cursor: pointer;
                }
            }
        }
    }
}

</style>
