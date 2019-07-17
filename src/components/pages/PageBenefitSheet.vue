<template>
<div class="BSContainer">
  <layout-sidebar v-on:change-page="$emit('change-page', $event)" v-bind:version="version"></layout-sidebar>
  <div class="mainContent">
    <div class="titleBar">
      <div class="copyButton">
        <!-- <i class="fas fa-align-justify" @click="hamburgerStyle = !hamburgerStyle"></i> -->
      </div>
      <p>Benefit Sheet<p>
      <div class="clearButton">
        <i class="far fa-trash-alt fa-2x" v-on:click=""></i>
      </div>
    </div>
    <div class="benefits">
      <p class="benefitsTitle">New Plan Benefits</p>
      <ui-autocomplete v-for="(i, index) in benefitSheet.benefits" :benefit="i" v-on:changeBenefit="updateBenefit(index, $event)"></ui-autocomplete>
    </div>
    <div class="oldBills">
      <input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" v-model="benefitSheet.currentPhoneBill">
      <p>+</p>
      <input placeholder="$0.00" type="tel" pattern="[0-9]*" step="0.01" v-model="benefitSheet.currentHomeSolution">
      <p>=</p>
      <p>${{ currentTotal.toFixed(2) }}</p>
    </div>
    <div class="billBreakdown" v-bind:class="[ hamburgerStyle === true ? 'displayNone' : '' ]">
      <div class="option1 option">
        <div class="chosenPlanLabel">
          <p>Option 1:</p>
          <div>{{option1ComputedTotals.planName}}</div>
        </div>
        <div class="breakdown">
          <div>
            <p>Plan:</p>
            <div>${{ option1ComputedTotals.planTotal.toFixed(2) }}</div>
          </div>
          <div>
            <p>Line Access:</p>
            <div>${{ option1ComputedTotals.lineAccessTotal.toFixed(2) }}</div>
          </div>
          <div>
            <p>TMP:</p>
            <div>${{ option1ComputedTotals.tmpTotal.toFixed(2) }}</div>
          </div>
          <div>
            <p>DPP:</p>
            <div>${{ option1ComputedTotals.dppTotal.toFixed(2) }}</div>
          </div>
           <div>
            <p>Total:</p>
            <div>${{ option1ComputedTotals.total.toFixed(2) }}</div>
          </div>
        </div>
      </div>
      <div class="option2 option">
        <div class="chosenPlanLabel">
          <p>Option 2:</p>
          <div>{{option2ComputedTotals.planName}}</div>
        </div>
        <div class="breakdown">
          <div>
            <p>Plan:</p>
            <div>${{ option2ComputedTotals.planTotal.toFixed(2) }}</div>
          </div>
          <div>
            <p>Line Access:</p>
            <div>${{ option2ComputedTotals.lineAccessTotal.toFixed(2) }}</div>
          </div>
          <div>
            <p>TMP:</p>
            <div>${{ option2ComputedTotals.tmpTotal.toFixed(2) }}</div>
          </div>
          <div>
            <p>DPP:</p>
            <div>${{ option2ComputedTotals.dppTotal.toFixed(2) }}</div>
          </div>
          <div>
            <p>Total:</p>
            <div>${{ option2ComputedTotals.total.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="costs">
      <div>
        <input placeholder="$0.00">
        <p>$0.00</p>
        <p>${{ option1ComputedTotals.fees.toFixed(2) }}</p>
      </div>
      <div>
        <input placeholder="$0.00">
        <p>$0.00</p>
        <p>${{ option2ComputedTotals.fees.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import LayoutSidebar from '@/components/layout/LayoutSidebar'
import UiAutocomplete from '@/components/ui/UiAutocomplete'
import externalData from '@/myJSON.json'

export default {
  name: 'PageBenefitSheet',

  components: {
    LayoutSidebar, UiAutocomplete
  },

  data: function () {
    return {
      benefitSheet: {
        benefits: ['', '', '', '', '', ''],
        currentPhoneBill: '',
        currentHomeSolution: ''
      },
      hamburgerStyle: false,
      version: externalData.version,
      option1ComputedTotals: {
        "planName": '',
        "planTotal": 0,
        "lineAccessTotal": 0,
        "tmpTotal": 0,
        "dppTotal": 0,
        "total": 0,
        "fees": 0
      },
      option2ComputedTotals: {
        "planName": '',
        "planTotal": 0,
        "lineAccessTotal": 0,
        "tmpTotal": 0,
        "dppTotal": 0,
        "total": 0,
        "fees": 0
      }
    }
  },

  mounted () {
    if (localStorage.getItem('option1Computed')) {
      try {
        this.option1ComputedTotals = JSON.parse(localStorage.getItem('option1Computed'))
      } catch (e) {
        localStorage.removeItem('option1Computed')
      }
    }
    if (localStorage.getItem('option2Computed')) {
      try {
        this.option2ComputedTotals = JSON.parse(localStorage.getItem('option2Computed'))
      } catch (e) {
        localStorage.removeItem('option2Computed')
      }
    }
    this.$nextTick(() => {
      if (localStorage.getItem('benefitSheet')) {
        try {
            this.benefitSheet = JSON.parse(localStorage.getItem('benefitSheet'))
        } catch (e) {
          localStorage.removeItem('benefitSheet')
        }
        console.log(this.benefitSheet.benefits)
      }
    })
  },

  methods: {
    updateBenefit: function (parentBenefitIndex, childBenefit) {
      console.log(this.benefitSheet.benefits)
      this.benefitSheet.benefits[parentBenefitIndex] = childBenefit
      this.saveBenefitSheetToLocalStorage()
      console.log(this.benefitSheet.benefits)
    },
    saveBenefitSheetToLocalStorage: function () {
      const parsed = JSON.stringify(this.benefitSheet)
      localStorage.setItem('benefitSheet', parsed)
    }
  },

  computed: {
    currentTotal: function () {
      var localTotal = parseInt(this.currentPhoneBill) + parseInt(this.currentHomeSolution)
      return localTotal
    }
  }
}
</script>

<style>
.BSContainer {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
}

.sidebar {
  background-color: rgba(0,0,0,.4);
  height: 100%;
  display: grid;
  grid-template-rows: 25% 15% 15% 15% 15% 15%;
}

.sidebar button {
  background-color: rgba(255,255,255,.8);
  border-radius: 10px;
  border: none;
  margin: 4% 5%;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

.username, .version {
  align-self: end;
  text-align: center;
  color: rgba(255,255,255,.8);
  font-size: 14px;
  /*visibility: hidden;*/
}

.username {
  align-self: center;
  /*border-bottom: 1px solid rgba(255,255,255,.8);*/
  padding-bottom: 3%;
}

.version {
  font-size: 20px;
  margin-bottom: 3%;
}

img {
  margin-bottom: 1%;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.8);
}

.mainContent {
  display: grid;
  /*justify-self: center;*/
  margin: 2%;
  background-color: rgba(255,255,255,.9);
  grid-template-rows: 10% 30% 10% 40% 10%;
  border-radius: 5px;
  /*width: 768px;*/
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
  /* grid-area: 1 / 3 / 2 / 4; */
  align-items: center;
  display: grid;
  /* grid-template-columns: 60% 20% 20%; */
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

.fa-copy {
  /* grid-area: 1 / 2 / 2 / 3; */
}

.fa-trash-alt {
  grid-area: 1 / 2 / 2 / 3;
  /* grid-area: 1 / 3 / 2 / 4; */
}

.displayNone {
  display: none !important;
}

.benefits {
  margin: 1%;
  border-radius: 5px;
  padding: 1%;
  background-color: silver;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 2fr 2fr 2fr;
}

.benefitsTitle {
  margin: 0;
  font-size: 16px;
  grid-column: 1 / 3;
  align-self: start;
  text-align: center;
}

.benefits > div {
  display: grid;
  justify-items: center;
  align-items: center;
}

.benefits input {
  width: 80%;
  font-size: 18px;
  -webkit-appearance: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid black;
  background-color: silver;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  color: black;
}

.oldBills {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 2fr;
  place-items: center;
}

.oldBills > input {
  margin: 1% 5%;
  font-size: 16px;
  -webkit-appearance: none;
  border: none;
  border: 1px solid grey;
  background-color: white;
  width: 128px;
  height: 32px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}

.oldBills > p:last-child {
  font-weight: bold;
}

.billBreakdown {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1%;
}

.billBreakdown p {
  margin: 0;
  padding: 0;
}

.option {
  display: grid;
  grid-template-rows: 10% 90%;
}

.option > div {
  align-items: center;
}

.chosenPlanLabel {
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 0 1%;
}

.chosenPlanLabel > p {
  font-size: 12px;
  color: red;
}

.breakdown {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  border: 1px solid grey;
}

.breakdown p {
  font-size: 14px;
}

.option1 > .breakdown {
  border-radius: 5px 0 0 5px;
}

.option2 > .breakdown {
  border-left: 0;
  border-radius: 0 5px 5px 0;
}

.breakdown > div {
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 3fr;
  margin: 0 1%;
}

.breakdown > div > p {
  justify-self: end;
}

.breakdown > div > div {
  margin: 0 5%;
  width: 60%;
  text-align: center;
  border-bottom: 1px solid black;
  font-weight: bold;
}

.breakdown > div:nth-child(4) > div {
}

.costs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 1% 1% 1%;
}

.costs > div {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  place-items: center;
  font-weight: bold;
}

.costs > div > input {
  margin: 1% 5%;
  font-size: 16px;
  -webkit-appearance: none;
  border: none;
  border: 1px solid grey;
  background-color: white;
  width: 96px;
  height: 32px;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  color: black;
  font-weight: bold;
}




@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)
{
  body {
    grid-template-columns: 1fr 3fr;	
  }

  .main select {
    text-indent: 10%;
  }
}




@media print {
  body, html {
    background: white !important;
  }

  .BSContainer {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none !important;
  }

  .mainContent {
    display: grid;
    /*justify-self: center;*/
    margin: 2%;
    grid-template-rows: 35% 10% 40% 15%;
    border: 1px solid gray;
    border-radius: 5px;
    /*width: 768px;*/
  }

  .titleBar {
    display: none !important;
  }

  .benefits {
    margin: 1%;
    border-radius: 5px;
    padding: 1%;
    background-color: lightgray;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr 2fr 2fr;
  }

  .benefitsTitle {
    margin: 0;
    font-size: 16px;
    grid-column: 1 / 3;
    align-self: start;
    text-align: center;
    color: red;
  }

  .benefits > div {
    display: grid;
    justify-items: center;
    align-items: center;
  }

  .positionRelative {
    position: relative;
  }

  .benefits input {
    width: 80%;
    font-size: 18px;
    -webkit-appearance: none;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid black;
    background-color: lightgray;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    color: black;
  }

  .autocompleteResults {
    position: absolute;
    top: 100%;
    left: 10%;
    background-color: white;
    width: 80%;
    align-self: start;
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocompleteResult {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocompleteResult:hover,
  .autocompleteResult.is-active {
    background-color: #4AAE9B;
    color: white;
  }

  .oldBills {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 1fr 2fr;
    place-items: center;
  }

  .oldBills > input {
    margin: 1% 5%;
    font-size: 16px;
    -webkit-appearance: none;
    border: none;
    border: 1px solid grey;
    background-color: white;
    width: 128px;
    height: 32px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }

  .oldBills > p:last-child {
    font-weight: bold;
  }

  .billBreakdown {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1%;
  }

  .billBreakdown p {
    margin: 0;
    padding: 0;
  }

  .option {
    display: grid;
    grid-template-rows: 10% 90%;
  }

  .option > div {
    align-items: center;
  }

  .chosenPlanLabel {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 0 1%;
  }

  .chosenPlanLabel > p {
    font-size: 12px;
    color: red;
  }

  .breakdown {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    border: 1px solid grey;
  }

  .breakdown p {
    font-size: 14px;
  }

  .option1 > .breakdown {
    border-radius: 5px 0 0 5px;
  }

  .option2 > .breakdown {
    border-left: 0;
    border-radius: 0 5px 5px 0;
  }

  .breakdown > div {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 3fr;
    margin: 0 1%;
  }

  .breakdown > div > p {
    justify-self: end;
  }

  .breakdown > div > div {
    margin: 0 5%;
    width: 60%;
    text-align: center;
    border-bottom: 1px solid black;
    font-weight: bold;
  }

  .breakdown > div:nth-child(4) > div {
  }

  .costs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0 1% 1% 1%;
  }

  .costs > div {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    place-items: center;
    font-weight: bold;
  }

  .costs > div > input {
    margin: 1% 5%;
    font-size: 16px;
    -webkit-appearance: none;
    border: none;
    border: 1px solid grey;
    background-color: white;
    width: 96px;
    height: 32px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    color: black;
    font-weight: bold;
  }
}
</style>
