<template>
<div class="usersContainer">
    <button class="addUser" @click="addUserModalActive = true">Add User</button>
    <div class="usersTable">
        <div>Name</div>
        <div>Email</div>
        <div>Store</div>
        <div>District</div>
        <div>Force New Password On Next Login?</div>
        <div>Admin?</div>
        <div>Actions</div>
    </div>
    <div class="usersTable" v-for="user in users" :key="user._id">
        <div>{{ user.firstName }} {{ user.lastName }}</div>
        <div>{{ user.email | abbreviateEmail }}@...</div>
        <div>{{ user.store }}</div>
        <div>{{ user.district }}</div>
        <div v-if="user.forceNewPasswordOnNextLogin"><i class="fas fa-check"></i></div>
        <div v-else></div>
        <div v-if="user.admin"><i class="fas fa-check"></i></div>
        <div v-else></div>
        <div class="actions">
            <!-- <i class="far fa-edit"></i> -->
            <i class="fas fa-trash" @click="openDeleteUserModal(user)"></i>
        </div>
    </div>
    <modal-add-user v-if="addUserModalActive" v-on:close-modal="addUserModalActive = false"/>
    <modal-delete-user v-if="deleteUserModalActive" v-bind="chosenUser" v-on:close-modal="deleteUserModalActive = false"/>
</div>
</template>

<script>
import axios from 'axios'

import AdminNavbar from '../AdminNavbar'
import ModalAddUser from './ModalAddUser'
import ModalDeleteUser from './ModalDeleteUser'

export default {
    name: 'PageAdmin',
    components: { AdminNavbar, ModalAddUser, ModalDeleteUser },
    data: function () {
        return {
            users: [],
            chosenUser: {
                _id: '',
                firstName: '',
                lastName: '',
                store: '',
                district: '',
            },
            addUserModalActive: false,
            deleteUserModalActive: false,
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
                headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) }
            })
            .then(response => {
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
            .catch(error => {
                console.log(error.msg)
            })
        },
        openDeleteUserModal(user) {
            this.chosenUser = user
            this.deleteUserModalActive = true
        }
    },
    mounted() {
        this.getAllUsers()
    },
}
</script>

<style lang="less">
.usersContainer {
    margin: 3%;

    .addUser {
        font-weight: 500;
        font-size: 16px;
        color: #edf0f1;
        text-decoration: none;
        padding: 9px 25px;
        background-color: rgba(0, 136, 169, 1);
        border: none;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease 0s;

        &:hover {
            background-color: rgba(0, 136, 169, 0.8);
        }

        &:focus {
            outline: none;
        }
    }

    .usersTable {
        display: grid;
        grid-template-columns: repeat(auto-fill, 14%);
        padding: 15px 10px;
        border-bottom: 1px solid black;
        text-align: center;
        align-items: center;

        &:first-of-type {
            font-weight: bold;
        }

        &:nth-of-type(2n) {
            background-color: #dedede;
        }

        &:nth-of-type(n+2) {
            border-left: 1px solid black;
            border-right: 1px solid black;
        }

        > .actions {
            display: flex;
            justify-content: center;
        }

        > .actions > i {
            cursor: pointer;
            margin: 0 2rem;
        }

        input {
            appearance: none;
            height: 1rem;
            width: 1rem;
            -webkit-appearance: none;
            -moz-appearance: none;
            -o-appearance: none;
            appearance: none;
            border: 1px solid black;
            border-radius: 4px;
            outline: none;
            transition-duration: 0.3s;
            background-color: none;
            cursor: pointer;

            &:checked {
                border: 1px solid black;
                background-color: #1F596E;
            }
        }
    }
}
</style>