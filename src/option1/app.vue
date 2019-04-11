<template>
    <Options v-bind="props"></Options>
</template>

<script>
import Options from '@/components/options.vue'
import externalData from '@/myJSON.json'

export default {

  name: 'option1',
  components: {
    Options
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
