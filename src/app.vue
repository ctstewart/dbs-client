<template>
  <component v-bind:is="currentPage" v-on:change-page="currentPage = $event"></component>
</template>

<script>
import PageLogin from './components/pages/PageLogin'
import PageBenefitSheet from './components/pages/PageBenefitSheet'
import PageOption1 from './components/pages/PageOption1'
import PageOption2 from './components/pages/PageOption2'
import JSON from './myJSON.json'

export default {
  name: 'app',
  components: {
    PageLogin, PageBenefitSheet, PageOption1, PageOption2
  },
  data: function () {
    return {
      currentPage: 'PageLogin'
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  background-repeat: no-repeat;
  background-attachment: fixed;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#0a6ada+0,2fd22c+100 */
  background: #0a6ada; /* Old browsers */
  background: -moz-linear-gradient(45deg, #0a6ada 0%, #2fd22c 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(45deg, #0a6ada 0%,#2fd22c 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(45deg, #0a6ada 0%,#2fd22c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0a6ada', endColorstr='#2fd22c',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px)
and (orientation : landscape)
{
  body {
    grid-template-columns: 1fr 3fr;
  }
}
</style>