<template>
<div class="sidebar">
  <div class="username"><img src="@/assets/tempUserIcon.png"><br>cstewart@wirelessworldus.com</div>
  <button @click="$emit('change-page', 'PageBenefitSheet')" :class="[ currentPage === 'PageBenefitSheet' ? 'activeButton' : '' ]" type="button">Benefit Sheet</button>
  <button @click="$emit('change-page', 'PageOption1')" :class="[ currentPage === 'PageOption1' ? 'activeButton' : '' ]" type="button">Option 1</button>
  <button @click="$emit('change-page', 'PageOption2')" :class="[ currentPage === 'PageOption2' ? 'activeButton' : '' ]" type="button">Option 2</button>
  <!-- <button @click="logout" type="button">Logout</button> -->
  <div class="versionAndLogout">
    <a @click="logout">Logout</a>
    <a class="logout">Version: {{version}}</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'Layoutsidebar',
  props: ['version', 'currentPage'],

  methods: {
    logout: function () {
      localStorage.removeItem('jwtoken')
      this.$emit('change-page', 'PageLogin')
    }
  }
}
</script>

<style>
.sidebar {
  background-color: rgba(0,0,0,.4);
  height: 100%;
  display: grid;
  grid-template-rows: 25% 15% 15% 15% 30%;
}

.sidebar button {
  background-color: rgba(255,255,255,.8);
  border-radius: 10px;
  border: none;
  margin: 4% 5%;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

.activeButton {
  background-color: rgba(31,89,110,.75) !important;
  color: rgba(255,255,255,.8) !important;
  border: 1px solid rgba(255,255,255,.8) !important;
}

.username, .versionAndLogout {
  align-self: end;
  color: rgba(255,255,255,.8);
  font-size: 14px;
  /*visibility: hidden;*/
}

.username {
  text-align: center;
  align-self: center;
  /*border-bottom: 1px solid rgba(255,255,255,.8);*/
  padding-bottom: 3%;
}

.versionAndLogout {
  text-decoration: underline;
  display: grid;
  grid-template-columns: 30% 70%;
  font-size: 1.1rem;
  margin: 0 3% 3%;
}

.logout {
  text-align: right;
}

img {
  margin-bottom: 1%;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.8);
}
</style>
