<template>
    <router-view/>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style lang="less">
@import './less/styles';

html {
    height: 100%;
}

body {
    height: 100%;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
}
</style>
