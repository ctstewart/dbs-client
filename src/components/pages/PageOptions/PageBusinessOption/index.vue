<template>
<div class="all gradientBackground">
    <layout-sidebar/>
    <div class="mainContent">
        <div class="titleBar">
            <div class="copyButton">
                <i v-if="this.$route.params.vuexModule === 'optionOne'" class="far fa-copy fa-2x" v-on:click="copyModuleOptionOneToOptionTwo"></i>
            </div>
            <p>{{whichOption}}</p>
            <div class="clearButton" @click="resetState">
                <span></span><i class="far fa-trash-alt fa-2x"></i>
            </div>
        </div>
        <div class="navBar">
            <button
                v-for="tab in tabs"
                v-bind:key="tab.id"
                v-bind:class="{ activetab: tab.active }"
                v-on:click="navbarClick(tab.id)"
            ><p>{{ tab.label }}</p></button>
            <div>Total: ${{ parseFloat(total).toFixed(2) }}</div>
        </div>
        <keep-alive>
            <component :is="currentTab"/>
        </keep-alive>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import jwtExpCheck from '@/mixins/jwtExpCheck'

import LayoutSidebar from '@/components/layout/LayoutSidebar'
import SectionPlan from './SectionPlan'
import SectionPullthru from './SectionPullthru'
import SectionDpp from './SectionDpp'

export default {
    name: 'LayoutOption',
    mixins: [jwtExpCheck],
    components: { LayoutSidebar, SectionPlan, SectionPullthru, SectionDpp },
    data() {
        return {
            currentTab: 'SectionPlan',
            whichOption: '',
            tabs: [
                { id: 'SectionPlan', label: 'Plan', active: true },
                { id: 'SectionPullthru', label: 'Pull Thru', active: false },
                { id: 'SectionDpp', label: 'DPP', active: false }
            ],
        }
    },

    beforeRouteUpdate (to, from, next) {
        if (to.params.vuexModule === 'optionOne') {
            this.whichOption = 'Option 1'
        } else if (to.params.vuexModule === 'optionTwo') {
            this.whichOption = 'Option 2'
        }
        next()
    },

    created () {
        if (this.$route.params.vuexModule === 'optionOne') {
            this.whichOption = 'Option 1'
        } else if (this.$route.params.vuexModule === 'optionTwo') {
            this.whichOption = 'Option 2'
        }
    },

    methods: {
        ...mapMutations({
            resetState (commit) {
                return commit(`business/${this.$route.params.vuexModule}/resetState`)
            }
        }),
        // I STILL NEED TO ADD THIS FUNCTIONALITY. DO NOT FORGET FUTURE ME.
        ...mapMutations([
            'copyModuleOptionOneToOptionTwo'
        ]),
        navbarClick(id) {
            this.tabs.forEach((tab) => {
                if (tab.id === id) {
                    tab.active = true
                    this.currentTab = tab.id
                } else {
                    tab.active = false
                }
            })
        },
    },

    computed: {
        ...mapState({
            total (state, getters) {
                return getters[`business/${this.$route.params.vuexModule}/total`]
            }
        }),
    }
}
</script>

<style lang="less" scoped>
@titleBarBlue: rgba(31,89,110,.75);
@newBlue: rgba(31,89,110);
@oldSectionGreen: #387A77;

.all {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 4fr;

    .mainContent {
        display: grid;
        margin: 2%;
        background-color: rgba(255,255,255,.9);
        grid-template-rows: 10% 10% 80%;
        border-radius: 5px;

        .titleBar {
            background-color: @oldSectionGreen;
            color: #F6F6F6;
            font-weight: bold;
            text-align: center;
            display: grid;
            border-bottom: 2px solid rgba(0,0,0,.5);
            border-radius: 5px 5px 0 0;
            grid-template-columns: 1fr 1fr 1fr;

            p {
                width: 0 auto;
                margin: 0;
                align-self: center;
                font-size: 24px;
                grid-area: 1 / 2 / 2 / 3;
            }

            .copyButton, .clearButton {
                align-items: center;
                display: grid;
                margin-right: 3%;
                margin-left: 3%;

                i {
                    cursor: pointer;
                }
            }

            .copyButton {
                grid-template-columns: 30% 70%;
            }

            .clearButton {
                grid-template-columns: 70% 30%;
            }           
        }

        .navBar {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 5fr;
            margin-left: 1%;
            color: @oldSectionGreen;

            button {
                margin: 0;
                padding: 0;
                background-color: #D3DFE1;
                height: 70%;
                align-self: end;
                border: 1px solid rgba(0,0,0,.2);
                font-size: 16px;
                font-weight: bold;
                /* font-style: italic; */
                display: grid;
                align-items: center;
                cursor: pointer;
                outline: 0;
                color: @oldSectionGreen;

                &:first-child {
                    border-top-left-radius: 10px;
                }

                &:nth-child(3) {
                    border-top-right-radius: 10px;
                }

                &.activetab {
                    background-color: @oldSectionGreen;
                    color: white;
                    border: none;
                }

                p {
                    margin: 0;
                    padding: 0;
                }
            }

            div {
                align-self: end;
                justify-self: end;
                font-size: 24px;
                font-weight: bold;
                margin-right: 1%;
                margin-bottom: 1%;
                width: 40%;
                text-align: center;

                &.active {
                    display: grid;
                }
            }
        }
    }
}
</style>