<template>
<div class="usersContainer">
    <button class="addUser">Add User</button>
    <div class="usersTable">
        <div>Name</div>
        <div>Email</div>
        <div>Store</div>
        <div>District</div>
        <div>Force New Password On Next Login</div>
        <div>Admin?</div>
        <div>Actions</div>
    </div>
    <div class="usersTable" v-for="user in users" :key="user._id">
        <div>{{ user.name }}</div>
        <div>{{ user.email | abbreviateEmail }}</div>
        <div>Store</div>
        <div>District</div>
        <div>true/false</div>
        <div>{{ user.admin }}</div>
        <div class="actions">
            <i class="far fa-edit"></i>
            <i class="fas fa-trash"></i>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

import AdminNavbar from './AdminNavbar'

export default {
    name: 'PageAdmin',
    components: { AdminNavbar },
    data: function () {
        return {
            users: [],
            adminVerified: false
        }
    },
    filters: {
        abbreviateEmail(email) {
            return email.split('@')[0]
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
    },
}
</script>

<style>
.usersContainer {
    margin: 3%;
}

.usersTable {
    display: grid;
    grid-template-columns: repeat(auto-fill, 14%);
    padding: 15px 10px;
    border-bottom: 1px solid black;
    text-align: center;
    align-items: center;
}

.usersTable:first-of-type {
    font-weight: bold;
}

.usersTable:nth-of-type(2n) {
    background-color: #dedede;
}

.usersTable:nth-of-type(n+2) {
    border-left: 1px solid black;
    border-right: 1px solid black;
}

.addUser {
    padding: 9px 25px;
    background-color: rgba(0, 136, 169, 1);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}

.addUser {
    background-color: rgba(0, 136, 169, 0.8);
}

.usersTable > .actions {
    display: flex;
    justify-content: space-between;
}

.usersTable > .actions > i {
    cursor: pointer;
}

.usersContainer > button {
    font-weight: 500;
    font-size: 16px;
    color: #edf0f1;
    text-decoration: none;
}

.usersContainer > button {
    padding: 9px 25px;
    background-color: rgba(0, 136, 169, 1);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}

.usersContainer > button:hover {
    background-color: rgba(0, 136, 169, 0.8);
}
</style>