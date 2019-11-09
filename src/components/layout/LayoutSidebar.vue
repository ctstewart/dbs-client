<template>
<div class="sidebar">
  <div class="username"><img src="@/assets/tempUserIcon.png"><br>{{userEmail}}</div>
  <router-link to="/" class="router-link">Benefit Sheet</router-link>
  <router-link to="/option/optionOne" class="router-link">Option 1</router-link>
  <router-link to="/option/optionTwo" class="router-link">Option 2</router-link>
  <!-- <button @click="logout" type="button">Logout</button> -->
  <div class="versionAndLogout">
    <a class="logout" @click="logout">Logout</a>
    <a class="versionFormatting">Version: {{webappVersion}}</a>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Layoutsidebar',
  computed: {
    ...mapState([
      'userEmail',
      'webappVersion'
    ])
  },
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/login')
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

.router-link {
  color: black;
  display: grid;
  align-items: center;
  justify-items: center;
  text-decoration: none;
  background-color: rgba(255,255,255,.8);
  border-radius: 10px;
  border: none;
  margin: 4% 5%;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

.router-link-exact-active {
  background-color: transparent !important;
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
  display: grid;
  grid-template-columns: 40% 60%;
  font-size: 1.1rem;
  margin: 0 3% 3%;
  cursor: pointer;
}

.logout {
  text-decoration: underline;
}

.versionFormatting {
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
