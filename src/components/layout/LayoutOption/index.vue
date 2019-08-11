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
                <span></span><i class="far fa-trash-alt fa-2x" v-on:click="restoreDefaultValues"></i>
            </div>
        </div>
        <div class="navBar">
            <button
                v-for="tab in tabs"
                v-bind:key="tab.name"
                v-bind:class="{ activetab: currentTab === tab.name }"
                v-on:click="currentTab = tab.name"
                ><p>{{ tab.label }}</p></button>
            <div>{{ textBeforeTotal }}{{ total }}</div>
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

import { mixAndMatch, oldUnlimitedPlans, tieredPlans, lineAccess } from '@/externalData/plans'

export default {
  name: 'LayoutOption',
  props: ['version', 'whichOption', 'whichOptionObject', 'whichOptionComputed', 'currentPage'],
  components: {
    LayoutSidebar, SectionPlan, SectionPullthru, SectionDpp
  },
  data: function () {
    return {
      currentTab: 'SectionPlan',
      tabs: [
        { name: 'SectionPlan', label: 'Plan' },
        { name: 'SectionPullthru', label: 'Pull Thru' },
        { name: 'SectionDpp', label: 'DPP' }
      ],
      isLoaded: false,
      mainObject: {

        numberOfPhones: 0,
        chosenPlan: 'Unlimited',
        tmp: '$0',
        tmpConvertedFromString: 0,
        militaryNew: false,
        militaryOld: false,
        responderNew: false,
        responderOld: false,
        discount: '0%',
        autopay: false,
        numberOfNewDevices: 0,

        tabsArray: [
          { name: 'planTabActive', value: true },
          { name: 'pullthruTabActive', value: false },
          { name: 'dppTabActive', value: false }
        ],

        mixAndMatchPlansArray: mixAndMatch.plans,

        militaryResponderDiscountAmountOld: mixAndMatch.militaryResponderDiscountOld,

        militaryResponderDiscountAmountNew: mixAndMatch.militaryResponderDiscountNew,

        oldUnlimitedPlansArray: oldUnlimitedPlans,

        tieredPlansArray: tieredPlans,

        twoyear: {
          value: 0,
          cost: 20
        },

        basic: {
          value: 0,
          cost: 30
        },

        lineAccess,

        existingDPPValues: Array(10).fill({ value: '' }),
        existingCreditValues: Array(10).fill({ value: '' }),
        newDPPValues: Array(10).fill({ value: '' }),
        newCreditValues: Array(10).fill({ value: '' })

      }
    }
  },

  mounted () {
    const parsed = JSON.stringify(this.mainObject)
    localStorage.setItem('defaultMainObject', parsed)

    if (localStorage.getItem(this.whichOptionObject)) {
      try {
        this.mainObject = JSON.parse(localStorage.getItem(this.whichOptionObject))
      } catch (e) {
        localStorage.removeItem(this.whichOptionObject)
      }
    }

    this.isLoaded = true
  },

  methods: {

    navbarClick: function (button) {
      for (var i = 0; i < mainObject.tabsArray.length; i++) {
        mainObject.tabsArray[i].value = false
        if (button === mainObject.tabsArray[i].name) {
          mainObject.tabsArray[i].value = true
        } else {
          mainObject.tabsArray[i].value = false
        }
      }
    },

    mixAndMatchPlanMath: function ({numberOfPhones, plansArray, autopay, militaryNew, militaryOld, responderNew, responderOld, militaryResponderDiscountAmountNew, militaryResponderDiscountAmountOld, twoYearNumber, twoYearCost, basicPhoneNumber, basicPhoneCost}) {
      var localTotal = 0

      if (numberOfPhones < 1) {
        return 0
      } else if (numberOfPhones > 5) {
        numberOfPhones = 5
      }

      plansArray.forEach((i) => {
        if (autopay) {
          localTotal = localTotal + (i.numberOfPhones * i[numberOfPhones].autopay)
        } else if (!autopay) {
          localTotal = localTotal + (i.numberOfPhones * i[numberOfPhones].noAutopay)
        }
      })

      if (militaryNew || responderNew) {
        localTotal = localTotal - militaryResponderDiscountAmountNew[numberOfPhones]
      } else if (militaryOld || responderOld) {
        localTotal = localTotal - militaryResponderDiscountAmountOld[numberOfPhones]
      }

      localTotal = localTotal + (twoYearNumber * twoYearCost)

      localTotal = localTotal + (basicPhoneNumber * basicPhoneCost)

      numberOfPhones = 0

      return localTotal
    },

    oldUnlimitedAndNewVerizonPlans: function () {
      if (this.computedNumberOfPhones <= 0) {
        return 0
      }

      var localTotal = 0

      this.mainObject.oldUnlimitedPlansArray.forEach((oldUnlimitedPlan) => {
        if (this.mainObject.chosenPlan === oldUnlimitedPlan.name) {
          if (this.mainObject.autopay) {
            localTotal += oldUnlimitedPlan.autopay
          } else if (!this.mainObject.autopay) {
            localTotal += oldUnlimitedPlan.noAutopay
          }

          if (this.mainObject.militaryNew || this.mainObject.responderNew) {
            localTotal = localTotal * 0.85
          }
        }
      })

      this.mainObject.tieredPlansArray.forEach((tieredPlan) => {
        if (this.mainObject.chosenPlan === tieredPlan.name) {
          if (this.mainObject.autopay === true) {
            localTotal = localTotal + tieredPlan.autopay
          } else if (this.mainObject.autopay === false) {
            localTotal = localTotal + tieredPlan.noAutopay
          }

          if (this.mainObject.militaryNew || this.mainObject.responderNew) {
            localTotal = localTotal * 0.85
          } else if (parseInt(this.mainObject.discount) > 0) {
            localTotal = localTotal * (0.01 * (100 - parseInt(this.mainObject.discount)))
          }
        }
      })

      localTotal = localTotal + (this.mainObject.twoyear.value * this.mainObject.twoyear.cost)

      localTotal = localTotal + (this.mainObject.basic.value * this.mainObject.basic.cost)

      return localTotal
    },

    saveToLocalStorage: function () {
      const parsed = JSON.stringify(this.mainObject)
      localStorage.setItem(this.whichOptionObject, parsed)
    },

    saveTotalsToLocalStorage: function () {
      var localTotal = 0
      localTotal = this.planTotal + this.lineAccessTotal + this.tmpTotal + this.dppTotal
      var computedTotals = {"planName": this.mainObject.chosenPlan,"planTotal": this.planTotal, "lineAccessTotal": this.lineAccessTotal, "tmpTotal": this.tmpTotal, "dppTotal": this.dppTotal, "total": localTotal, "fees": this.mainObject.numberOfNewDevices * 40}
      const parsed = JSON.stringify(computedTotals)
      localStorage.setItem(this.whichOptionComputed, parsed)
    },

    restoreDefaultValues: function () {
      if (localStorage.getItem('defaultMainObject')) {
        try {
          this.mainObject = JSON.parse(localStorage.getItem('defaultMainObject'))
        } catch (e) {
          localStorage.removeItem('defaultMainObject')
        }
      }
    },

    copyToOption2: function () {
      const parsed = JSON.stringify(this.mainObject)
      localStorage.setItem('option2Object', parsed)
      alert('Copied to Option 2!')
    }

  },

  computed: {

    total: function () {
      if (this.isLoaded === false) {
        // console.log('Loading')
        return 'Loading'
      } else if (this.isLoaded === true) {
        // console.log('Loaded')
        this.saveToLocalStorage()
        this.saveTotalsToLocalStorage()

        if (this.computedNumberOfPhones <= 0) {
          return 'Add Phones'
        }

        return (this.planTotal + this.lineAccessTotal + this.tmpTotal + this.dppTotal).toFixed(2)

      }
    },

    textBeforeTotal: function () {
      if (this.total !== 'Add Phones') {
        return 'Total: $'
      }
    },

    benefitSheetTotalOption1: function () {
      if (this.total === 'Add Phones') {
        return this.total
      } else if (this.total !== 'Add Phones') {
        return '$' + this.total + ' plus tax'
      }
    },

    planTotal: function () {
      if (this.mainObject.chosenPlan === 'Unlimited') {
        var objectForMethod = {
          'numberOfPhones': this.computedNumberOfPhones,
          'plansArray': this.mainObject.mixAndMatchPlansArray,
          'autopay': this.mainObject.autopay,
          'militaryNew': this.mainObject.militaryNew,
          'militaryOld': this.mainObject.militaryOld,
          'responderNew': this.mainObject.responderNew,
          'responderOld': this.mainObject.responderOld,
          'militaryResponderDiscountAmountNew': this.mainObject.militaryResponderDiscountAmountNew,
          'militaryResponderDiscountAmountOld': this.mainObject.militaryResponderDiscountAmountOld,
          'twoYearNumber': this.mainObject.twoyear.value,
          'twoYearCost': this.mainObject.twoyear.cost,
          'basicPhoneNumber': this.mainObject.basic.value,
          'basicPhoneCost': this.mainObject.basic.cost
        }
        return this.mixAndMatchPlanMath(objectForMethod)
      } else {
        return this.oldUnlimitedAndNewVerizonPlans()
      }
    },

    lineAccessTotal: function () {
      var localTotal = 0

      // Checks if the current plan is unlimited
      if (this.mainObject.chosenPlan === 'Unlimited') {
        // Finds out how many phones there are for the Do More and Get More plans
        var numberOfDoMoreAndGetMorePhones = 0;
        this.mainObject.mixAndMatchPlansArray.forEach((mixAndMatchPlan) => {
          if (mixAndMatchPlan.name === 'Do More' || mixAndMatchPlan.name === 'Get More') {
            numberOfDoMoreAndGetMorePhones += mixAndMatchPlan.numberOfPhones
          }
        })
        // Finds out how many tablets and jetpacks there are
        var numberOfTabletsAndJetpacks = 0;
        this.mainObject.lineAccess.forEach((connectedDevice) => {
          if (connectedDevice.name === 'Tablet' || connectedDevice.name === 'Jetpack') {
            numberOfTabletsAndJetpacks += connectedDevice.value
          }
        })
        // Subtracts the smaller amount between tablets + jetpacks and do more + get more multiplied it by 10 from the localTotal for the half-off line access cost
        localTotal -= Math.min(numberOfDoMoreAndGetMorePhones, numberOfTabletsAndJetpacks) * 10
        // Multiplies the number of connected devices by the plan cost and adds it to the localTotal variable
        this.mainObject.lineAccess.forEach((connectedDevice) => {
          localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
        })

        if (this.mainObject.militaryNew || this.mainObject.militaryOld) {
          localTotal = localTotal * 0.85
        }
      }

      this.mainObject.oldUnlimitedPlansArray.forEach((plan) => {
        if (this.mainObject.chosenPlan === plan.name) {
          this.mainObject.lineAccess.forEach((connectedDevice) => {
            localTotal = localTotal + (connectedDevice.unlimited * connectedDevice.value)
          })
          localTotal = localTotal + (this.computedNumberOfPhones * 20)
        }
      })

      this.mainObject.tieredPlansArray.forEach((plan) => {
        if (this.mainObject.chosenPlan === plan.name) {
          this.mainObject.lineAccess.forEach((connectedDevice) => {
            localTotal = localTotal + (connectedDevice.tiered * connectedDevice.value)
          })
          localTotal = localTotal + (this.computedNumberOfPhones * 20)
        }
      })

      return localTotal
    },

    tmpTotal: function () {
      var localTotal = 0

      this.mainObject.tmpConvertedFromString = parseInt(this.mainObject.tmp.replace('$', ''))
      localTotal = localTotal + this.mainObject.tmpConvertedFromString

      return localTotal
    },

    dppTotal: function () {
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

    computedNumberOfPhones: function () {
      var localTotal = 0

      if (this.mainObject.chosenPlan === 'Unlimited') {
        this.mainObject.mixAndMatchPlansArray.forEach((mixAndMatchPlan) => {
          localTotal = localTotal + mixAndMatchPlan.numberOfPhones
        })
        this.mainObject.numberOfPhones = 0

      } else if (this.mainObject.chosenPlan !== 'Unlimited') {
        this.mainObject.mixAndMatchPlansArray.forEach((mixAndMatchPlan) => {
          mixAndMatchPlan.numberOfPhones = 0
        })
        localTotal = this.mainObject.numberOfPhones

      }

      if (localTotal == null) {
        localTotal = 0
      }

      return localTotal
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