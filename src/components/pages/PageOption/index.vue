<template>
<div class="all">
    <layout-sidebar v-on:change-page="$emit('change-page', $event)" v-bind:version="version" v-bind:currentPage="currentPage"/>
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
            <div>Total: ${{ total }}</div>
        </div>
        <keep-alive>
            <component :is="currentTab"/>
        </keep-alive>
    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import LayoutSidebar from '@/components/layout/LayoutSidebar'
import SectionPlan from './SectionPlan'
import SectionPullthru from './SectionPullthru'
import SectionDpp from './SectionDpp'

export default {
  name: 'LayoutOption',
  props: ['version', 'whichOption', 'whichOptionObject', 'whichOptionComputed', 'currentPage'],
  components: { LayoutSidebar, SectionPlan, SectionPullthru, SectionDpp },
  data() {
    return {
      currentTab: 'SectionPlan',
      tabs: [
        { id: 'SectionPlan', label: 'Plan', active: true },
        { id: 'SectionPullthru', label: 'Pull Thru', active: false },
        { id: 'SectionDpp', label: 'DPP', active: false }
      ],
      vuexModule: null
    }
  },

/*   beforeRouteUpdate (to, from, next) {
    console.log(to.params.vuexModule)
    console.log(from.params.vuexModule)
    next()
  }, */

  methods: {
    ...mapMutations({
      resetState (commit) {
        return commit(`${this.$route.params.vuexModule}/resetState`)
      }
    }),
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

/*     copyToOption2() {
      const parsed = JSON.stringify(this.mainObject)
      localStorage.setItem('option2Object', parsed)
      alert('Copied to Option 2!')
    } */

  },

  computed: {
    ...mapState({
      chosenPlan (state) {
        return state[this.$route.params.vuexModule].chosenPlan
      },
      total (state, getters) {
        return getters[`${this.$route.params.vuexModule}/total`]
      }
    })
  }
}
</script>

<style lang="less" scoped>
@titleBarBlue: rgba(31,89,110,.75);
@newBlue: rgba(31,89,110);
@oldSectionGreen: #387A77;

.display-none {
    display: none;
}

.display-grid {
    display: grid;
}

.all {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr;
}

.mainContent {
    display: grid;
    margin: 2%;
    background-color: rgba(255,255,255,.9);
    grid-template-rows: 10% 10% 80%;
    border-radius: 5px;
}

.titleBar {
    background-color: @oldSectionGreen;
    color: #F6F6F6;
    font-weight: bold;
    text-align: center;
    display: grid;
    border-bottom: 2px solid rgba(0,0,0,.5);
    border-radius: 5px 5px 0 0;
    grid-template-columns: 1fr 1fr 1fr;
}

.titleBar p {
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
}

.titleBar i {
    cursor: pointer;
}

.copyButton {
    grid-template-columns: 30% 70%;
}

.clearButton {
    grid-template-columns: 70% 30%;
}

.navBar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 5fr;
    margin-left: 1%;
    color: @oldSectionGreen;
}

.navBar button {
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
}

.navBar button p {
    margin: 0;
    padding: 0;
}

.navBar button:first-child {
    border-top-left-radius: 10px;
}

.navBar button:nth-child(3) {
    border-top-right-radius: 10px;
}

.navBar button.activetab {
    background-color: @oldSectionGreen;
    color: white;
    border: none;
}

div.active {
    display: grid;
}

.navBar div {
    align-self: end;
    justify-self: end;
    font-size: 24px;
    font-weight: bold;
    margin-right: 1%;
    margin-bottom: 1%;
    width: 40%;
    text-align: center;
}
</style>