<template>
  <div class="container">
    <div>
      <h2>DIGITAL BENEFIT SHEET</h2>
      <h5>Making math easy,<br>so you can focus on what's<br>important.</h5>
      <button onclick="location.href='benefitSheet.html'" type="button">LOGIN</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style>
.container {
  height: 100%;
  display: grid;
}

.container div {
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

h2, h5, button {
  width: 80%;
  margin: 0 auto;
  padding: 1%;
}

h2 {
  align-self: end;
}

h5 {
  align-self: start;
  padding: 1%;
}

button {
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



@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape)
{
	
}
</style>
