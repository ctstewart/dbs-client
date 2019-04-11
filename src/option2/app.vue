<template>
    <Options v-bind="props"></Options>
</template>

<script>
import Options from '@/components/options.vue'
import JSON from '@/myJSON.json'

export default {

  name: 'option2',
  components: {
    Options
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
