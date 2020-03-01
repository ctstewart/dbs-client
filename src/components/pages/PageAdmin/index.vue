<template>
<div class="fullscreenContainer">
    <admin-navbar/>
    <admin-users/>
 </div>
</template>

<script>
import AdminNavbar from './AdminNavbar'
import AdminUsers from './AdminUsers'

export default {
	name: 'PageAdmin',
	components: { AdminNavbar, AdminUsers }
}
</script>

<style lang="less" scoped>
.fullscreenContainer {
    min-height: 100%;
}
</style>
