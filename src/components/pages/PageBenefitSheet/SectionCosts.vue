<template>
<div class="costs">
    <div v-for="(i, index) in optionsComputed">
        <input placeholder="$0.00">
        <p>${{ differenceMonthly[index].toFixed(2) }}</p>
        <p>${{ i.fees.toFixed(2) }}</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'SectionCosts',

    props: {
        optionsComputed: {
            type: Array,
            required: true
        },
        differenceMonthly: {
            type: Array,
            required: true
        }
    },

    data: function () {
        return {
        }
    }
}
</script>

<style>
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

.costs > div > input:focus {
    outline: none;
    border: 1px solid blue;
    border-radius: 5px;
}
</style>