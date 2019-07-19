<template>
<div class="BSContainer">
  <layout-sidebar v-on:change-page="$emit('change-page', $event)" v-bind:version="version"></layout-sidebar>
  <div class="mainContent" :class="[ hamburgerStyle ? 'hamburgerStyle' : 'fullStyle' ]">
    <div class="titleBar">
      <div class="copyButton">
        <i class="fas fa-align-justify fa-2x" @click="hamburgerStyle = !hamburgerStyle"></i>
      </div>
      <p>Benefit Sheet<p>
      <div class="clearButton">
        <i class="far fa-trash-alt fa-2x" v-on:click=""></i>
      </div>
    </div>
    <section-benefits></section-benefits>
    <section-old-bills v-on:old-total-changed="oldTotal = $event"></section-old-bills>
    <section-bill-breakdown :optionsComputed="optionsComputed" v-show="!hamburgerStyle"></section-bill-breakdown>
    <section-costs :optionsComputed="optionsComputed" :differenceMonthly="differenceMonthly"></section-costs>
  </div>
</div>
</template>

<script>
import LayoutSidebar from '@/components/layout/LayoutSidebar'
import SectionBenefits from './SectionBenefits'
import SectionOldBills from './SectionOldBills'
import SectionBillBreakdown from './SectionBillBreakdown'
import SectionCosts from './SectionCosts'
import externalData from '@/myJSON.json'

export default {
  name: 'PageBenefitSheet',

  components: {
    LayoutSidebar, SectionBenefits, SectionOldBills, SectionBillBreakdown, SectionCosts
  },

  data: function () {
    return {
      hamburgerStyle: false,
      version: externalData.version,
      oldTotal: 0,
      optionsComputed: [
        {
          "name": 'Option 1',
          "localStorageLabel": 'option1Computed',
          "planName": '',
          "planTotal": 0,
          "lineAccessTotal": 0,
          "tmpTotal": 0,
          "dppTotal": 0,
          "total": 0,
          "fees": 0
        },
        {
          "name": 'Option 2',
          "localStorageLabel": 'option2Computed',
          "planName": '',
          "planTotal": 0,
          "lineAccessTotal": 0,
          "tmpTotal": 0,
          "dppTotal": 0,
          "total": 0,
          "fees": 0
        }
      ]
    }
  },

  created () {
    for (var i=0; i < this.optionsComputed.length; i++) {
      if (localStorage.getItem(this.optionsComputed[i].localStorageLabel)) {
        try {
          this.optionsComputed[i] = JSON.parse(localStorage.getItem(this.optionsComputed[i].localStorageLabel))
        } catch (e) {
          localStorage.removeItem(this.optionsComputed[i].localStorageLabel)
        }
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

  computed: {
    differenceMonthly: function () {
      var localArray = [0, 0]
      for (var i=0; i < localArray.length; i++) {
        localArray[i] = this.optionsComputed[i].total - this.oldTotal
      }
      return localArray
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

.fullStyle {
  transition: all 1s;
}

.hamburgerStyle {
  grid-template-rows: 15% 45% 20% 20%;
  margin: 10%;
  transition: all 1s;
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
