<template>
<div class="option-plan">
    <div class="group-container two-column-width">
        <p class="group-container-label">Number of Phones</p>
        <div class="group-container-main">
            <div class="input-container" v-for="(plan, index) in plans" :key="plan.id">
                <label>{{ plan.id }}</label>
                <input :value="plan.numberOfPhones" @change="setPlans({index, value: parseInt($event.target.value)})">
            </div>
        </div>
    </div>
    <div class="group-container">
        <p class="group-container-label">Discount</p>
        <div class="group-container-main">
            <div class="input-container four-column-width">
                <label>Military Discount</label>
                <label class="switch">
                    <input type="checkbox" :checked="militaryDiscount.isActive" @change="toggleMilitaryDiscount">
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    </div>
    <div class="group-container">
        <p class="group-container-label">TMP</p>
        <div class="group-container-main">
            <div class="input-container four-column-width">
                <label>TMP</label>
                <input :value="tmp" @change="mutate({property: 'tmp', with: $event.target.value})">
            </div>
        </div>
    </div>
    <div class="group-container two-column-width">
        <p class="group-container-label">Misc.</p>
        <div class="group-container-main">
            <div class="input-container two-column-width">
                <label>Number of 2 Year Phones</label>
                <input :value="twoYear.numberOfPhones" @change="mutateTwoYear($event.target.value)">
            </div>
            <div class="input-container two-column-width-second">
                <label>Number of Activation Fees</label>
                <input :value="numberOfActivationFees" @change="mutate({property: 'numberOfActivationFees', with: $event.target.value})">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'SectionPlan',
    computed: {
        ...mapState({
            plans (state) {
                return state['business'][this.$route.params.vuexModule].plans
            },
            militaryDiscount (state) {
                return state['business'][this.$route.params.vuexModule].militaryDiscount
            },
            tmp (state) {
                return state['business'][this.$route.params.vuexModule].tmp
            },
            twoYear (state) {
                return state['business'][this.$route.params.vuexModule].twoYear
            },
            numberOfActivationFees (state) {
                return state['business'][this.$route.params.vuexModule].numberOfActivationFees
            },
        }),
    },
    methods: {
        ...mapMutations({
            mutate (commit, payload) {
                return commit(`business/${this.$route.params.vuexModule}/mutate`, payload)
            },
            setPlans (commit, payload) {
                return commit(`business/${this.$route.params.vuexModule}/setPlans`, payload)
            },
            toggleMilitaryDiscount (commit) {
                return commit(`business/${this.$route.params.vuexModule}/toggleMilitaryDiscount`)
            },
            mutateTwoYear (commit, payload) {
                return commit(`business/${this.$route.params.vuexModule}/mutateTwoYear`, payload)
            }
        })
    }
}
</script>

<style lang="less" scoped>
.option-plan {
    background-color: #387A77;
    margin: 0 1% 1% 1%;
    border-radius: 0 5px 5px 5px;
    text-align: center;
    color: white;
    padding: 3%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    .group-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: .5rem;

        > p {
            align-self: flex-start;
            margin-bottom: 0;
        }

        .group-container-main {
            border: 1px solid white;
            padding: .25rem;
            height: 75%;
            border-radius: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            align-items: center;
            justify-items: center;

            .input-container {
                display: flex;
                align-items: center;
                margin: .25rem;

                > * {
                    margin-right: 1rem;
                }

                label {
                    text-align: right;
                }

                input {
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

                .switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;

                    input {
                        opacity: 0;
                        width: 0;
                        height: 0;
                    }

                    .slider {
                        position: absolute;
                        cursor: pointer;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #ccc;
                        -webkit-transition: .4s;
                        transition: .4s;

                        &:before {
                            position: absolute;
                            content: "";
                            height: 26px;
                            width: 26px;
                            left: 4px;
                            bottom: 4px;
                            background-color: white;
                            -webkit-transition: .4s;
                            transition: .4s;
                        }
                    }

                    input:checked + .slider {
                        background-color: #2196F3;
                    }

                    input:focus + .slider {
                        box-shadow: 0 0 1px #2196F3;
                    }

                    input:checked + .slider:before {
                        -webkit-transform: translateX(26px);
                        -ms-transform: translateX(26px);
                        transform: translateX(26px);
                    }
                }
            }
        }

        &:nth-of-type(2) {
            margin-right: 1rem;
        }

        &:nth-of-type(3) {
            margin-left: 1rem;
        }
    }
}

.two-column-width {
    grid-column: 1 / span 2;
}

.two-column-width-second {
    grid-column: 3 / span 2;
}

.four-column-width {
    grid-column: 1 / span 4;
}
</style>