<template>
<div class="benefits">
    <p class="benefitsTitle">New Plan Benefits</p>
    <ui-autocomplete v-for="(i, index) in benefits" :key="index" :benefit="i" v-on:changeBenefit="mutateBenefits({index, value: $event})"/>
</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import UiAutocomplete from '@/components/ui/UiAutocomplete'
const { mapState, mapMutations } = createNamespacedHelpers('benefitSheet')

export default {
	name: 'SectionBenefits',
	components: { UiAutocomplete },
	computed: {
		...mapState([
			'benefits'
		])
	},
	methods: {
		...mapMutations([
			'mutateBenefits'
		])
	}
}
</script>

<style lang="less" scoped>
.benefits {
    margin: 1%;
    border-radius: 5px;
    padding: 1%;
    background-color: silver;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 2fr 2fr 2fr;

    @media print {
        background-color: lightgray;
    }

    .benefitsTitle {
        margin: 0;
        font-size: 16px;
        grid-column: 1 / span 2;
        align-self: start;
        text-align: center;

        @media print {
            color: red;
        }
    }
}
</style>
