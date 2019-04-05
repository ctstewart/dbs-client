<template>
<div class="main dpp">
    <div class="dppColumn">
        <div>
            <input v-for="i in localValue.existingDPPValues" type='tel' pattern="[0-9]*" step='0.01' placeholder="Existing DPP" v-model.number="i.value">
        </div>
        <div>
            <input v-for="i in localValue.existingCreditValues" type='tel' pattern="[0-9]*" step='0.01' placeholder="Existing Credits" v-model.number="i.value">
        </div>
    </div>
    <div class="dppColumn">
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
    }
  }
}
</script>

<style scoped>
.main {
    background-color: #387A77;
    margin: 0 1% 1% 1%;
    border-radius: 0 5px 5px 5px;
    text-align: center;
    color: white;
    padding: 3%;
}

.dpp {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.dppColumn {
    display: grid;
    border: 1px solid white;
    margin: 0px 10px;
    padding: 10px;
    border-radius: 5%;
}

.dppColumn {
    grid-template-columns: 1fr 1fr;
}

.dppColumn div {
    margin: 0 5px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    place-items: center;
}

.dpp input {
    -webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
    -moz-appearance: none; /* for firefox compatibility */
    appearance: none;
    background-color: rgba(255,255,255,0.8);
    width: 90%;
    height: 80%;
    border-radius: 5px;
    padding: 0;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
}

.dpp input::placeholder {
    font-size: 14px;
}
</style>
