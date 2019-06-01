<template>
<div class="all" id="app">
    <Sidebar v-bind:version="version"></Sidebar>
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
                v-bind:key="tab"
                v-bind:class="{ activetab: currentTab === tab }"
                v-on:click="currentTab = tab"
                ><p>{{ tab }}</p></button>
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
import Sidebar from '@/components/Sidebar.vue'
import Plan from '@/components/Plan.vue'
import PullThru from '@/components/PullThru.vue'
import DPP from '@/components/DPP.vue'

export default {
  name: 'options',
  props: ['version', 'whichOption', 'whichOptionObject', 'whichOptionComputed'],
  components: {
    Sidebar, Plan, PullThru, DPP
  },
  data: function () {
    return {
      currentTab: 'Plan',
      tabs: ['Plan', 'PullThru', 'DPP'],
      isLoaded: false,
      mainObject: {

        numberOfPhones: 0,
        chosenPlan: 'Unlimited',
        tmp: '$0',
        tmpConvertedFromString: 0,
        military: false,
        responder: false,
        discount: '0%',
        autopay: false,

        tabsArray: [
          { name: 'planTabActive', value: true },
          { name: 'pullthruTabActive', value: false },
          { name: 'dppTabActive', value: false }
        ],

        mixAndMatchPlansArray: [
          {
            name: 'Go',
            numberOfPhones: 0,
            1: { lines: 1, autopay: 75, noAutopay: 80 },
            2: { lines: 2, autopay: 65, noAutopay: 70 },
            3: { lines: 3, autopay: 50, noAutopay: 55 },
            4: { lines: 4, autopay: 40, noAutopay: 45 }
          },
          {
            name: 'Beyond',
            numberOfPhones: 0,
            1: { lines: 1, autopay: 85, noAutopay: 90 },
            2: { lines: 2, autopay: 80, noAutopay: 85 },
            3: { lines: 3, autopay: 60, noAutopay: 65 },
            4: { lines: 4, autopay: 50, noAutopay: 55 }
          },
          {
            name: 'Above',
            numberOfPhones: 0,
            1: { lines: 1, autopay: 95, noAutopay: 100 },
            2: { lines: 2, autopay: 90, noAutopay: 95 },
            3: { lines: 3, autopay: 70, noAutopay: 75 },
            4: { lines: 4, autopay: 60, noAutopay: 65 }
          },
          {
            name: 'Just Kids',
            numberOfPhones: 0,
            1: { lines: 1, autopay: 0, noAutopay: 0 },
            2: { lines: 2, autopay: 55, noAutopay: 60 },
            3: { lines: 3, autopay: 45, noAutopay: 50 },
            4: { lines: 4, autopay: 35, noAutopay: 40 }
          }
        ],

        militaryDiscountAmount: {
          1: 15,
          2: 35,
          3: 40,
          4: 40
        },

        oldUnlimitedPlansArray: [
          { name: '$65 Unlimited', autopay: 60, noAutopay: 65 },
          { name: '$110 Unlimited', autopay: 100, noAutopay: 110 }
        ],

        tieredPlansArray: [
          { name: '2GB', autopay: 35, noAutopay: 35 },
          { name: '4GB', autopay: 50, noAutopay: 50 },
          { name: '5GB', autopay: 35, noAutopay: 40 },
          { name: '8GB', autopay: 70, noAutopay: 70 },
          { name: '12GB', autopay: 80, noAutopay: 80 },
          { name: '16GB', autopay: 90, noAutopay: 90 },
          { name: '24GB', autopay: 110, noAutopay: 110 }
        ],

        twoyear: {
          value: 0,
          cost: 20
        },

        basic: {
          value: 0,
          cost: 30
        },

        lineAccess: [
          { name: 'Tablet', tiered: 10, unlimited: 20, value: 0 },
          { name: 'Jetpack', tiered: 10, unlimited: 20, value: 0 },
          { name: 'Hum+', tiered: 10, unlimited: 10, value: 0 },
          { name: 'HumX', tiered: 15, unlimited: 20, value: 0 },
          { name: 'Homephone', tiered: 20, unlimited: 20, value: 0 },
          { name: 'Gizmo', tiered: 5, unlimited: 5, value: 0 },
          { name: 'Smartwatch', tiered: 10, unlimited: 10, value: 0 },
          { name: 'Arlo', tiered: 10, unlimited: 20, value: 0 }
        ],

        existingDPPValues: [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' }
        ],

        existingCreditValues: [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' }
        ]
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

    mixAndMatchPlanMath: function () {
      var localTotal = 0
      var localNumberOfPhones = this.computedNumberOfPhones

      if (localNumberOfPhones < 1) {
        return 0
      } else if (localNumberOfPhones > 4) {
        localNumberOfPhones = 4
      }

      for (var i = 0; i < this.mainObject.mixAndMatchPlansArray.length; i++) {
        if (this.mainObject.autopay === true) {
          localTotal = localTotal + (this.mainObject.mixAndMatchPlansArray[i].numberOfPhones * this.mainObject.mixAndMatchPlansArray[i][localNumberOfPhones].autopay)
        } else if (this.mainObject.autopay === false) {
          localTotal = localTotal + (this.mainObject.mixAndMatchPlansArray[i].numberOfPhones * this.mainObject.mixAndMatchPlansArray[i][localNumberOfPhones].noAutopay)
        }
      }

      if (this.mainObject.military === true || this.mainObject.responder === true) {
        localTotal = localTotal - this.mainObject.militaryDiscountAmount[localNumberOfPhones]
      }

      localTotal = localTotal + (this.mainObject.twoyear.value * this.mainObject.twoyear.cost)

      localTotal = localTotal + (this.mainObject.basic.value * this.mainObject.basic.cost)

      localNumberOfPhones = 0

      return localTotal
    },

    oldUnlimitedAndNewVerizonPlans: function () {
      if (this.computedNumberOfPhones <= 0) {
        return 0
      }

      var localTotal = 0

      for (var i = 0; i < this.mainObject.oldUnlimitedPlansArray.length; i++) {
        if (this.mainObject.chosenPlan === this.mainObject.oldUnlimitedPlansArray[i].name) {
          if (this.mainObject.autopay === true) {
            localTotal = localTotal + this.mainObject.oldUnlimitedPlansArray[i].autopay
          } else if (this.mainObject.autopay === false) {
            localTotal = localTotal + this.mainObject.oldUnlimitedPlansArray[i].noAutopay
          }

          if (this.mainObject.military === true || this.mainObject.responder === true) {
            localTotal = localTotal * 0.85
          }
        }
      }

      for (var i = 0; i < this.mainObject.tieredPlansArray.length; i++) {
        if (this.mainObject.chosenPlan === this.mainObject.tieredPlansArray[i].name) {
          if (this.mainObject.autopay === true) {
            localTotal = localTotal + this.mainObject.tieredPlansArray[i].autopay
          } else if (this.mainObject.autopay === false) {
            localTotal = localTotal + this.mainObject.tieredPlansArray[i].noAutopay
          }

          if (this.mainObject.military === true || this.mainObject.responder === true) {
            localTotal = localTotal * 0.85
          } else if (parseInt(this.mainObject.discount) > 0) {
            localTotal = localTotal * (0.01 * (100 - parseInt(this.mainObject.discount)))
          }
        }
      }

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
      var computedTotals = {"planName": this.mainObject.chosenPlan,"planTotal": this.planTotal, "lineAccessTotal": this.lineAccessTotal, "tmpTotal": this.tmpTotal, "dppTotal": this.dppTotal, "total": localTotal}
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
      alert('Copied!')
    }

  },

  computed: {

    total: function () {
      if (this.isLoaded === false) {
        console.log('Loading')
        return 'Loading'
      } else if (this.isLoaded === true) {
        console.log('Loaded')
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
        return this.mixAndMatchPlanMath()
      } else {
        return this.oldUnlimitedAndNewVerizonPlans()
      }
    },

    lineAccessTotal: function () {
      var localTotal = 0

      if (this.mainObject.chosenPlan === 'Unlimited') {
        for (var i = 0; i < this.mainObject.lineAccess.length; i++) {
          localTotal = localTotal + (this.mainObject.lineAccess[i].unlimited * this.mainObject.lineAccess[i].value)
        }

        if (this.mainObject.military === true) {
          localTotal = localTotal * 0.85
        }
      }

      for (var i = 0; i < this.mainObject.oldUnlimitedPlansArray.length; i++) {
        if (this.mainObject.chosenPlan === this.mainObject.oldUnlimitedPlansArray[i].name) {
          for (var i = 0; i < this.mainObject.lineAccess.length; i++) {
            localTotal = localTotal + (this.mainObject.lineAccess[i].unlimited * this.mainObject.lineAccess[i].value)
          }
          localTotal = localTotal + (this.computedNumberOfPhones * 20)
        }
      }

      for (var i = 0; i < this.mainObject.tieredPlansArray.length; i++) {
        if (this.mainObject.chosenPlan === this.mainObject.tieredPlansArray[i].name) {
          for (var i = 0; i < this.mainObject.lineAccess.length; i++) {
            localTotal = localTotal + (this.mainObject.lineAccess[i].tiered * this.mainObject.lineAccess[i].value)
          }
          localTotal = localTotal + (this.computedNumberOfPhones * 20)
        }
      }

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

      for (var i = 0; i < this.mainObject.existingDPPValues.length; i++) {
        if (isNaN(parseInt(this.mainObject.existingDPPValues[i].value))) {
        } else {
          localTotal = localTotal + this.mainObject.existingDPPValues[i].value
        }
      }

      for (var i = 0; i < this.mainObject.existingCreditValues.length; i++) {
        if (isNaN(parseInt(this.mainObject.existingCreditValues[i].value))) {
        } else {
          localTotal = localTotal - this.mainObject.existingCreditValues[i].value
        }
      }

      return localTotal
    },

    computedNumberOfPhones: function () {
      var localTotal = 0

      if (this.mainObject.chosenPlan === 'Unlimited') {
        for (var i = 0; i < this.mainObject.mixAndMatchPlansArray.length; i++) {
          localTotal = localTotal + this.mainObject.mixAndMatchPlansArray[i].numberOfPhones
        }

        this.mainObject.numberOfPhones = 0
      } else if (this.mainObject.chosenPlan !== 'Unlimited') {
        for (var i = 0; i < this.mainObject.mixAndMatchPlansArray.length; i++) {
          this.mainObject.mixAndMatchPlansArray[i].numberOfPhones = 0
        }

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

<style lang="less">
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
    margin: 5% 3%;
    background-color: rgba(255,255,255,.9);
    grid-template-rows: 10% 10% 80%;
    border-radius: 5px;
}

.titleBar {
    background-color: rgba(31,89,110,.75);
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
    color: #387A77;
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
    color: #387A77;
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
    background-color: #387A77;
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
