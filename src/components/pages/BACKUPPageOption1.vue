<template>
    <layout-option v-on:change-page="$emit('change-page', $event)" v-bind:currentPage="currentPage" v-bind="props"></layout-option>
</template>

<script>
import LayoutOption from '@/components/layout/LayoutOption'
import externalData from '@/myJSON.json'

export default {

  name: 'PageOption1',
  props: ['currentPage'],
  components: {
    LayoutOption
  },
  data: function () {
    return {
      props: {
        version: externalData.version,
        whichOption: 'Option 1',
        whichOptionObject: 'option1Object',
        whichOptionComputed: 'option1Computed'
      }
    }
  }
}
</script>
