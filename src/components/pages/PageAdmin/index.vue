<template>
<div class="fullscreenContainer">
    <admin-navbar/>
    <admin-users/>
 </div>
</template>

<script>
import axios from 'axios'

import AdminNavbar from './AdminNavbar'
import AdminUsers from './AdminUsers'

export default {
    name: 'PageAdmin',
    components: { AdminNavbar, AdminUsers },
}
</script>

<style>
html, body {
    background-color: white !important;
}

.fullscreenContainer {
    min-height: 100%;
    background-color: white;
}
</style>