<template>
<div class="main plan">
    <div class="dropdownAndButtons">
        <select id="planDropdown" v-model="mainObject.chosenPlan">
            <option>Unlimited</option>
            <option v-for="i in oldUnlimitedPlansArrayReversed">{{i.name}}</option>
            <option v-for="i in tieredPlansArrayReversed">{{i.name}}</option>
        </select>
    </div>
    <span>Number of Phones (exclude $30 basic phones)</span>
    <div class="input threeColumns">
        <div v-bind:class="[ mainObject.chosenPlan === 'Unlimited' ? 'hidden' : 'twoColumns middle' ]">
            <div>Number of Phones</div>
            <select v-model="mainObject.numberOfPhones">
                <option v-for="i in 11">{{i - 1}}</option>
            </select>
        </div>
        <div v-bind:class="[ mainObject.chosenPlan === 'Unlimited' ? 'twoColumns' : 'hidden' ]" v-for="i in mainObject.mixAndMatchPlansArray">
            <div>{{i.name}}</div>
            <select v-model.number="i.numberOfPhones">
                <option v-for="i in 11">{{i - 1}}</option>
            </select>
        </div>
    </div>
    <span>Discounts</span>
    <div class="input eightColumns">
        <div>Autopay?</div>
        <label class="switch">
            <input type="checkbox" v-model="mainObject.autopay">
            <span class="slider"></span>
        </label>
        <div>Military Discount</div>
        <label class="switch">
            <input type="checkbox" v-model="mainObject.military">
            <span class="slider"></span>
        </label>
        <div>First Responder Discount</div>
        <label class="switch">
            <input type="checkbox"v-model="mainObject.responder">
            <span class="slider"></span>
        </label>
        <div>Other Discount</div>
        <select v-model="mainObject.discount">
            <option v-for="i in 31">{{i - 1}}%</option>
        </select>
    </div>
    <span>TMP and Misc.</span>
    <div class="input">
        <div>TMP</div>
        <select v-model="mainObject.tmp">
            <option v-for="i in 51">${{i - 1}}</option>
        </select>
        <div>Phones in 2 year Contracts</div>
        <select v-model="mainObject.twoyear.value">
            <option v-for="i in 11">{{i - 1}}</option>
        </select>
        <div>$30 Basic Phones</div>
        <select v-model="mainObject.basic.value">
            <option v-for="i in 11">{{i - 1}}</option>
        </select>
    </div>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      mainObject: {

        activetab: 1,
        numberOfPhones: 0,
        chosenPlan: 'Unlimited',
        tmp: '$0',
        tmpConvertedFromString: 0,
        military: false,
        responder: false,
        discount: '0%',
        autopay: false,

        benefits: ['TEST', '', '', '', '', ''],

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

    if (localStorage.getItem('mainObject')) {
      try {
        this.mainObject = JSON.parse(localStorage.getItem('mainObject'))
      } catch (e) {
        localStorage.removeItem('mainObject')
      }
    }

    this.isLoaded = true
  },

  methods: {

    navbarClick: function (button) {
      var i
      for (i = 0; i < mainObject.tabsArray.length; i++) {
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

      for (i = 0; i < this.mainObject.mixAndMatchPlansArray.length; i++) {
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

      for (i = 0; i < this.mainObject.oldUnlimitedPlansArray.length; i++) {
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

      for (i = 0; i < this.mainObject.tieredPlansArray.length; i++) {
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
      localStorage.setItem('mainObject', parsed)
    },

    restoreDefaultValues: function () {
      if (localStorage.getItem('defaultMainObject')) {
        try {
          this.mainObject = JSON.parse(localStorage.getItem('defaultMainObject'))
        } catch (e) {
          localStorage.removeItem('defaultMainObject')
        }
      }
    }

  },

  computed: {

    tieredPlansArrayReversed: function () {
      return this.mainObject.tieredPlansArray.slice().reverse()
    },

    oldUnlimitedPlansArrayReversed: function () {
      return this.mainObject.oldUnlimitedPlansArray.slice().reverse()
    },

    total: function () {
      if (this.isLoaded === false) {
        console.log('Loading')
        return 'Loading'
      } else if (this.isLoaded === true) {
        console.log('Loaded')
        this.saveToLocalStorage()

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
        for (i = 0; i < this.mainObject.lineAccess.length; i++) {
          localTotal = localTotal + (this.mainObject.lineAccess[i].unlimited * this.mainObject.lineAccess[i].value)
        }

        if (this.mainObject.military === true) {
          localTotal = localTotal * 0.85
        }
      }

      for (i = 0; i < this.mainObject.oldUnlimitedPlansArray.length; i++) {
        if (this.mainObject.chosenPlan === this.mainObject.oldUnlimitedPlansArray[i].name) {
          for (i = 0; i < this.mainObject.lineAccess.length; i++) {
            localTotal = localTotal + (this.mainObject.lineAccess[i].unlimited * this.mainObject.lineAccess[i].value)
          }
          localTotal = localTotal + (this.computedNumberOfPhones * 20)
        }
      }

      for (i = 0; i < this.mainObject.tieredPlansArray.length; i++) {
        if (this.mainObject.chosenPlan === this.mainObject.tieredPlansArray[i].name) {
          for (i = 0; i < this.mainObject.lineAccess.length; i++) {
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

      for (i = 0; i < this.mainObject.existingDPPValues.length; i++) {
        if (isNaN(parseInt(this.mainObject.existingDPPValues[i].value))) {
        } else {
          localTotal = localTotal + this.mainObject.existingDPPValues[i].value
        }
      }

      for (i = 0; i < this.mainObject.existingCreditValues.length; i++) {
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
        for (i = 0; i < this.mainObject.mixAndMatchPlansArray.length; i++) {
          localTotal = localTotal + this.mainObject.mixAndMatchPlansArray[i].numberOfPhones
        }

        this.mainObject.numberOfPhones = 0
      } else if (this.mainObject.chosenPlan !== 'Unlimited') {
        for (i = 0; i < this.mainObject.mixAndMatchPlansArray.length; i++) {
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

<style>
.plan {
    display: grid;
}

.main {
    background-color: #387A77;
    margin: 0 1% 1% 1%;
    border-radius: 0 5px 5px 5px;
    text-align: center;
    color: white;
    padding: 3%;
}

#textAlignRight {
    justify-self: end;
    margin-right: 20%;
}

.input {
    /*align-self: center;*/
    border: 1px solid white;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
    justify-items: end;
}

.hidden {
    display: none;
}

.middle {
    grid-area: 1 / 2 / 2 / 3;
}

.twoColumns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: end;
}

.threeColumns {
    grid-template-columns: repeat(3, 1fr);
}

.eightColumns {
    grid-template-columns: repeat(8, 1fr);
}

.input div {
    font-size: 14px;
    width: 100%;
    text-align: right;
}

.main span {
    text-align: left;
    align-self: end;
}

.main select, .switch {
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
}

.switch input {
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
}

.slider:before {
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

.dropdownAndButtons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

#planDropdown {
    width: 128px;
    place-self: center;
    grid-area: 1 / 2 / 2 / 3;
}

@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape)
{
    .main select {
        text-indent: 10%;
    }
}
</style>
