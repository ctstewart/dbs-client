<template>
    <layout-option v-on:change-page="$emit('change-page', $event)" v-bind="props"></layout-option>
</template>

<script>
import LayoutOption from '@/components/layout/LayoutOption'
import JSON from '@/myJSON.json'

export default {

  name: 'PageOption2',
  components: {
    LayoutOption
  },
  data: function () {
    return {
      props: {
        version: JSON.version,
        whichOption: 'Option 2',
        whichOptionObject: 'option2Object',
        whichOptionComputed: 'option2Computed'
      }
    }
  }
}
</script>
