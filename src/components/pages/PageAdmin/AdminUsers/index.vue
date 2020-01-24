<template>
<div class="usersContainer">
    <button class="addUser" @click="addUserModalActive = true">Add User</button>
    <div class="usersTable">
        <div @click="sortMethod('firstName')">
            Name
            <i v-if="sort.sortField !== 'firstName'" class="fas fa-sort"></i>
            <i v-else-if="sort.sortDirAsc" class="fas fa-sort-up"></i>
            <i v-else-if="!sort.sortDirAsc" class="fas fa-sort-down"></i>
        </div>
        <div @click="sortMethod('email')">
            Email
            <i v-if="sort.sortField !== 'email'" class="fas fa-sort"></i>
            <i v-else-if="sort.sortDirAsc" class="fas fa-sort-up"></i>
            <i v-else-if="!sort.sortDirAsc" class="fas fa-sort-down"></i>
        </div>
        <div @click="sortMethod('store')">
            Store
            <i v-if="sort.sortField !== 'store'" class="fas fa-sort"></i>
            <i v-else-if="sort.sortDirAsc" class="fas fa-sort-up"></i>
            <i v-else-if="!sort.sortDirAsc" class="fas fa-sort-down"></i>
        </div>
        <div @click="sortMethod('district')">
            District
            <i v-if="sort.sortField !== 'district'" class="fas fa-sort"></i>
            <i v-else-if="sort.sortDirAsc" class="fas fa-sort-up"></i>
            <i v-else-if="!sort.sortDirAsc" class="fas fa-sort-down"></i>
        </div>
        <div>Force New Password On Next Login?</div>
        <div @click="sortMethod('admin')">
            Admin?
            <i v-if="sort.sortField !== 'admin'" class="fas fa-sort"></i>
            <i v-else-if="sort.sortDirAsc" class="fas fa-sort-up"></i>
            <i v-else-if="!sort.sortDirAsc" class="fas fa-sort-down"></i>
        </div>
        <div>Actions</div>
    </div>
    <div class="usersTable" v-for="user in sortedUsers" :key="user._id">
        <div>{{ user.firstName }} {{ user.lastName }}</div>
        <div>{{ user.email | abbreviateEmail }}@...</div>
        <div>{{ user.store }}</div>
        <div>{{ user.district }}</div>
        <div v-if="user.forceNewPasswordOnNextLogin"><i class="fas fa-check"></i></div>
        <div v-else></div>
        <div v-if="user.admin"><i class="fas fa-check"></i></div>
        <div v-else></div>
        <div class="actions">
            <i v-if="!user.admin || $store.state.superAdmin && !user.superAdmin" class="far fa-edit" @click="openUpdateUserModal(user)"></i>
            <i v-if="!user.admin || $store.state.superAdmin && !user.superAdmin" class="fas fa-trash" @click="openDeleteUserModal(user)"></i>
        </div>
    </div>
    <modal-add-user v-if="addUserModalActive" v-on:close-modal="addUserModalActive = false"/>
    <modal-delete-user v-if="deleteUserModalActive" v-bind="chosenUser" v-on:close-modal="deleteUserModalActive = false"/>
    <modal-update-user v-if="updateUserModalActive" v-bind="chosenUser" v-on:close-modal="updateUserModalActive = false"/>
</div>
</template>

<script>
import axios from 'axios'

import AdminNavbar from '../AdminNavbar'
import ModalAddUser from './ModalAddUser'
import ModalDeleteUser from './ModalDeleteUser'
import ModalUpdateUser from './ModalUpdateUser'

export default {
    name: 'PageAdmin',
    components: { AdminNavbar, ModalAddUser, ModalDeleteUser, ModalUpdateUser },
    data: function () {
        return {
            users: [],
            chosenUser: {
                _id: '',
                firstName: '',
                lastName: '',
                email: '',
                store: '',
                district: '',
                forceNewPasswordOnNextLogin: false,
                admin: false,
            },
            sort: {
                sortField: 'store',
                sortDirAsc: true
            },
            addUserModalActive: false,
            deleteUserModalActive: false,
            updateUserModalActive: false,
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
                this.users = response.data.users
            })
            .catch(error => {
                console.log(error.msg)
            })
        },
        openDeleteUserModal(user) {
            this.chosenUser = user
            this.deleteUserModalActive = true
        },
        openUpdateUserModal(user) {
            this.chosenUser = user
            this.updateUserModalActive = true
        },
        sortMethod(clickedSortField) {
            if (this.sort.sortField !== clickedSortField) {
                this.sort.sortField = clickedSortField
                this.sort.sortDirAsc = true
            } else {
                this.sort.sortDirAsc = !this.sort.sortDirAsc
            }
            console.log(this.sort.sortField)
        },
        compareValues(key, order = 'asc') {
            return function innerSort(a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    return 0
                }

                const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key]

                const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key]

                let comparison = 0
                if (varA > varB) {
                    comparison = 1
                } else if (varA < varB) {
                    comparison = -1
                }
                return (
                    (order === 'desc') ? (comparison * -1) : comparison
                )
            }
        }
    },
    computed: {
        sortedUsers() {
            if (this.sort.sortDirAsc) {
                return this.users.sort(this.compareValues(this.sort.sortField))
            } else if (!this.sort.sortDirAsc) {
                return this.users.sort(this.compareValues(this.sort.sortField, 'desc'))
            }
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
            cursor: pointer;
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