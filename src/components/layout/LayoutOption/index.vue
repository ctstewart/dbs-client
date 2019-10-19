<template>
<div class="all">
    <layout-sidebar v-on:change-page="$emit('change-page', $event)" v-bind:version="version" v-bind:currentPage="currentPage"></layout-sidebar>
    <div class="mainContent">
        <div class="titleBar">
            <div class="copyButton">
                <i v-if="whichOption === 'Option 1'" class="far fa-copy fa-2x" v-on:click="copyToOption2"></i>
            </div>
            <p>{{whichOption}}</p>
            <div class="clearButton">
                <span></span><i class="far fa-trash-alt fa-2x"></i>
            </div>
        </div>
        <div class="navBar">
            <button
                v-for="tab in tabs"
                v-bind:key="tab.name"
                v-bind:class="{ activetab: currentTab === tab.name }"
                v-on:click="currentTab = tab.name"
                ><p>{{ tab.label }}</p></button>
            <div>{{ textBeforeTotal }}{{ $store.getters.total }}</div>
        </div>
        <keep-alive>
          <component
              :is="currentTab"
              v-model="mainObject"
          ></component>
        </keep-alive>
    </div>
</div>
</template>

<script>
import LayoutSidebar from '@/components/layout/LayoutSidebar'
import SectionPlan from './SectionPlan'
import SectionPullthru from './SectionPullthru'
import SectionDpp from './SectionDpp'

// import { mixAndMatch, oldUnlimitedPlans, tieredPlans, lineAccess } from '@/externalData/plans'

export default {
  name: 'LayoutOption',
  props: ['version', 'whichOption', 'whichOptionObject', 'whichOptionComputed', 'currentPage'],
  components: { LayoutSidebar, SectionPlan, SectionPullthru, SectionDpp },
  data() {
    return {
      currentTab: 'SectionPlan',
      tabs: [
        { name: 'SectionPlan', label: 'Plan' },
        { name: 'SectionPullthru', label: 'Pull Thru' },
        { name: 'SectionDpp', label: 'DPP' }
      ],
      mainObject: {
        tmp: '$0',
        tmpConvertedFromString: 0,
        tabsArray: [
          { name: 'planTabActive', value: true },
          { name: 'pullthruTabActive', value: false },
          { name: 'dppTabActive', value: false }
        ]
      }
    }
  },

  mounted () {
    /* const parsed = JSON.stringify(this.mainObject)
    localStorage.setItem('defaultMainObject', parsed)

    if (localStorage.getItem(this.whichOptionObject)) {
      try {
        this.mainObject = JSON.parse(localStorage.getItem(this.whichOptionObject))
      } catch (e) {
        localStorage.removeItem(this.whichOptionObject)
      }
    }

    this.isLoaded = true */
  },

  methods: {

    navbarClick(button) {
      for (var i = 0; i < mainObject.tabsArray.length; i++) {
        mainObject.tabsArray[i].value = false
        if (button === mainObject.tabsArray[i].name) {
          mainObject.tabsArray[i].value = true
        } else {
          mainObject.tabsArray[i].value = false
        }
      }
    },

    copyToOption2() {
      const parsed = JSON.stringify(this.mainObject)
      localStorage.setItem('option2Object', parsed)
      alert('Copied to Option 2!')
    }

  },

  computed: {
    chosenPlan() {
      return this.$store.chosenPlan
    },

    total() {
      return this.$store.getters.total
    },

    textBeforeTotal() {
      if (this.total !== 'Add Phones') {
        return 'Total: $'
      }
    },

    benefitSheetTotalOption1() {
      if (this.total === 'Add Phones') {
        return this.total
      } else if (this.total !== 'Add Phones') {
        return '$' + this.total + ' plus tax'
      }
    },

    tmpTotal() {
      var localTotal = 0

      this.mainObject.tmpConvertedFromString = parseInt(this.mainObject.tmp.replace('$', ''))
      localTotal = localTotal + this.mainObject.tmpConvertedFromString

      return localTotal
    },

    dppTotal() {
      var localTotal = 0

      this.mainObject.existingDPPValues.forEach((existingDPP) => {
        if (isNaN(parseInt(existingDPP.value))) {
        } else {
          localTotal = localTotal + existingDPP.value
        }
      })

      this.mainObject.existingCreditValues.forEach((existingCredit) => {
        if (isNaN(parseInt(existingCredit.value))) {
        } else {
          localTotal = localTotal - existingCredit.value
        }
      })

      return localTotal
    },

    computedNumberOfPhones() {

    }

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