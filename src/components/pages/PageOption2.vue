<template>
    <layout-option v-on:change-page="$emit('change-page', $event)" v-bind:currentPage="currentPage" v-bind="props"></layout-option>
</template>

<script>
import LayoutOption from '@/components/layout/LayoutOption'
import externalData from '@/myJSON.json'

export default {

  name: 'PageOption2',
  props: ['currentPage'],
  components: {
    LayoutOption
  },
  data: function () {
    return {
      props: {
        version: externalData.version,
        whichOption: 'Option 2',
        whichOptionObject: 'option2Object',
        whichOptionComputed: 'option2Computed'
      }
    }
  }
}
</script>
