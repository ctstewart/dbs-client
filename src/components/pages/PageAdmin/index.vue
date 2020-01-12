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
    data: function () {
        return {
            users: [],
            adminVerified: false
        }
    },
    methods: {
        getAllUsers() {
            axios({
                method: 'get',
                url: '/api/users/adminGetAllUsers',
                headers: { authorization: localStorage.getItem('jwt') }
            })
            .then((response) => {
                const compare = ((a, b) => {
                    const userA = a.email.toLowerCase()
                    const userB = b.email.toLowerCase()

                    var comparison = 0
                    if (userA > userB) {
                        comparison = 1
                    } else if (userA < userB) {
                        comparison = -1
                    }

                    return comparison
                })
                this.users = response.data.users.sort(compare)
            })
            .catch((error) => {
                console.log(error.msg)
            })
        },
    },
    mounted() {
        this.getAllUsers()
    }
}
</script>

<style>
.fullscreenContainer {
    min-height: 100%;
    display: -ms-grid;
    display: grid;
    background-color: white;
}
</style>