<template>
<div class="main dpp">
    <div class="dppColumn">
        <div>
            <input v-for="(i, index) in localValue.existingDPPValues" type='tel' pattern="[0-9]*" step='0.01' placeholder="Existing DPP" v-model.number="i.value">
        </div>
        <div>
            <input v-for="(i, index) in localValue.existingCreditValues" type='tel' pattern="[0-9]*" step='0.01' placeholder="Existing Credits" v-model.number="i.value">
        </div>
    </div>
    <div class="dppColumn">
        Coming Soon: Pricing and Ordering Sheet
<!--         <div>
            <select v-for="(i, index) in localValue.newDPPValues" v-model="localValue.newDPPValues">
                <option>New DPP</option>
                <option v-for="(phone, index) in temporaryTestingInaccuratePhonePriceArray" v-bind:value="phone.fullRetail">{{phone.phoneName}}</option>
            </select>
        </div>
        <div>
            <input v-for="(i, index) in localValue.newCreditValues" type='tel' pattern="[0-9]*" step='0.01' placeholder="New Credits" v-model.number="i.value">
        </div>
 -->    </div>
</div>
</template>

<script>
export default {
    name: 'SectionDpp',

    props: ['value'],

    data: function () {
        return {
            temporaryTestingInaccuratePhonePriceArray: [
                { phoneName: 'iPhone 8.5', fullRetail: 700 },
                { phoneName: 'iPhone 9', fullRetail: 800 },
                { phoneName: 'iPhone 9 & 3/4', fullRetail: 934 },
                { phoneName: 'One phone to rule them all', fullRetail: 1000 },
                { phoneName: 'A fake phone', fullRetail: 24 },
                { phoneName: 'Not a grand', fullRetail: 500 }
            ]
        }
    },

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
    display: -ms-grid;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    -ms-grid-row-align: center;
    -ms-grid-column-align: center;
    place-items: center;
    align-items: center;
    justify-items: center;
}

.dpp input, select {
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
