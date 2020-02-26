<template>
<div class="main plan">
    <plan-dropdown/>
    <span>Number of Phones (exclude $30 basic phones)</span>
    <number-of-phones/>
    <span>Discounts</span>
    <plan-discounts/>
    <span>TMP and Misc.</span>
    <tmp-and-misc/>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import PlanDropdown from './PlanDropdown'
import NumberOfPhones from './NumberOfPhones'
import PlanDiscounts from './PlanDiscounts'
import TmpAndMisc from './TmpAndMisc'

export default {
    name: 'SectionPage',
    components: { PlanDropdown, NumberOfPhones, PlanDiscounts, TmpAndMisc },
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

.twoRows {
  grid-row: 1 / 3; 
}

.otherDiscountLabel {
  grid-area: 1 / 7 / 3 / 8; 
}

.otherDiscountDropdown {
  grid-area: 1 / 8 / 3 / 9; 
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

.fourColumns {
  grid-template-columns: repeat(4, 1fr);
}

.fiveColumns {
  grid-template-columns: repeat(5, 1fr);
}

.fiveColumns :nth-child(5) {
  grid-area: 1 / 5 / 3 / 6;
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

.main select, .main input, .switch {
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
