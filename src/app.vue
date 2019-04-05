<template>
    <Options v-bind="props"></Options>
</template>

<script>
import Options from './components/options.vue'
import JSON from './myJSON.json'

export default {

  name: 'app',
  components: {
    Options
  },
  data: function () {
    return {
      props: {
        version: JSON.version,
        whichOptionObject: 'option1Object'
      }
    }
  }
}
</script>
