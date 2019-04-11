<template>
<div class="main plan">
    <div class="dropdownAndButtons">
        <select id="planDropdown" v-model="value.chosenPlan">
            <option>Unlimited</option>
            <option v-for="i in oldUnlimitedPlansArrayReversed">{{i.name}}</option>
            <option v-for="i in tieredPlansArrayReversed">{{i.name}}</option>
        </select>
    </div>
    <span>Number of Phones (exclude $30 basic phones)</span>
    <div class="input" v-bind:class="[ value.chosenPlan === 'Unlimited' ? 'fourColumns' : 'threeColumns' ]">
        <div v-bind:class="[ value.chosenPlan === 'Unlimited' ? 'hidden' : 'twoColumns middle' ]">
            <div>Number of Phones</div>
            <select v-model="value.numberOfPhones">
                <option v-for="i in 11">{{i - 1}}</option>
            </select>
        </div>
        <div v-bind:class="[ value.chosenPlan === 'Unlimited' ? 'twoColumns' : 'hidden' ]" v-for="i in value.mixAndMatchPlansArray">
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
            <input type="checkbox" v-model="value.autopay">
            <span class="slider"></span>
        </label>
        <div>Military Discount</div>
        <label class="switch">
            <input type="checkbox" v-model="value.military">
            <span class="slider"></span>
        </label>
        <div>First Responder Discount</div>
        <label class="switch">
            <input type="checkbox"v-model="value.responder">
            <span class="slider"></span>
        </label>
        <div>Other Discount</div>
        <select v-model="value.discount">
            <option v-for="i in 31">{{i - 1}}%</option>
        </select>
    </div>
    <span>TMP and Misc.</span>
    <div class="input">
        <div>TMP</div>
        <select v-model="value.tmp">
            <option v-for="i in 51">${{i - 1}}</option>
        </select>
        <div>Phones in 2 year Contracts</div>
        <select v-model="value.twoyear.value">
            <option v-for="i in 11">{{i - 1}}</option>
        </select>
        <div>$30 Basic Phones</div>
        <select v-model="value.basic.value">
            <option v-for="i in 11">{{i - 1}}</option>
        </select>
    </div>
</div>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    tieredPlansArrayReversed: function() {
        return this.value.tieredPlansArray.slice().reverse();
    },

    oldUnlimitedPlansArrayReversed: function() {
        return this.value.oldUnlimitedPlansArray.slice().reverse();
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

.fourColumns {
  grid-template-columns: repeat(4, 1fr);
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
