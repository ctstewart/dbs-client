<template>
<div class="loginLandingDiv">
    <h2>DIGITAL BENEFIT SHEET</h2>
    <h5>Making math easy,<br>so you can focus on what's<br>important.</h5>
    <button type="button" @click="$emit('change-to-form')">LOGIN</button>
</div>
</template>

<script>
export default {
    name: 'LoginLanding'
}
</script>

<style>
.loginLandingDiv {
  display: grid;
  background-color: rgba(255,255,255,.8);
  width: 50%;
  height: 50%;
  margin: 0 auto;
  place-self: center;
  border-radius: 5px;
  grid-template-rows: repeat(4, 1fr);
  text-align: center;
}

.loginLandingDiv h2,
.loginLandingDiv h5,
.loginLandingDiv button {
  width: 80%;
  margin: 0 auto;
  padding: 1%;
}

.loginLandingDiv h2 {
  align-self: end;
}

.loginLandingDiv h5 {
  align-self: start;
  padding: 1%;
}

.loginLandingDiv button {
  align-self: center;
  color: white;
  background-color: #1F596E;
  border-radius: 10px;
  width: 30%;
  height: 80%;
  border: none;
  font-weight: bold;
  font-size: 20px;
  outline: none;
  cursor: pointer;
}
</style>