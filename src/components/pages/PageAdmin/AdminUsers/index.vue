<template>
<div class="usersContainer">
	<button class="addUser" @click="addUserModalActive = true">Add User</button>
	<button v-if="$store.state.userInfo.superAdmin" class="addUser" @click="resetHasSeenNewChanges">New Changes Reset</button>
	<span class="filterUsers">
		<p>Filter By:</p>
		<select v-model="selectedFilter">
			<option v-for="option in filter" :value="option.id" :key="option.id">{{ option.label }}</option>
		</select>
		<div class="filterSearch">
			<i class="fas fa-search"></i>
			<input type="text" placeholder="Filter" v-model="filterText"/>
		</div>
	</span>
	<div class="loadingSpinner" v-if="loading">
		<i class="fas fa-spinner fa-spin"></i>
	</div>
	<div v-else>
		<div class="usersTable">
			<div v-for="(i, index) in sortableTableHeaders" @click="sortMethod(i.sortMethodVariable)" :key="index">
				{{ i.label }}
				<i v-if="sort.sortField !== i.sortMethodVariable" class="fas fa-sort"></i>
				<i v-else-if="sort.sortDirAsc" class="fas fa-sort-up"></i>
				<i v-else-if="!sort.sortDirAsc" class="fas fa-sort-down"></i>
			</div>
			<div>Force New Password On Next Login?</div>
			<div>Actions</div>
		</div>
		<div class="usersTable" v-for="user in sortedUsers" :key="user._id">
			<div>{{ user.firstName }} {{ user.lastName }}</div>
			<div>{{ user.email | abbreviateEmail }}@...</div>
			<div>{{ user.store }}</div>
			<div>{{ user.district }}</div>
			<div v-if="user.admin"><i class="fas fa-check"></i></div>
			<div v-else></div>
			<div v-if="user.forceNewPasswordOnNextLogin"><i class="fas fa-check"></i></div>
			<div v-else></div>
			<div class="actions">
				<i v-if="!user.admin || $store.state.userInfo.superAdmin && !user.superAdmin" class="fas fa-scroll" @click="openUserUsageModal(user)"></i>
				<i v-if="!user.admin || $store.state.userInfo.superAdmin && !user.superAdmin" class="fas fa-edit" @click="openUpdateUserModal(user)"></i>
				<i v-if="!user.admin || $store.state.userInfo.superAdmin && !user.superAdmin" class="fas fa-trash" @click="openDeleteUserModal(user)"></i>
			</div>
		</div>
	</div>
	<modal-add-user v-if="addUserModalActive" v-on:close-modal="addUserModalActive = false"/>
	<modal-delete-user v-else-if="deleteUserModalActive" v-bind="chosenUser" v-on:close-modal="deleteUserModalActive = false"/>
	<modal-update-user v-else-if="updateUserModalActive" v-bind="chosenUser" v-on:close-modal="updateUserModalActive = false"/>
	<modal-user-usage v-else-if="userUsageModalActive" v-bind="chosenUser" v-on:close-modal="userUsageModalActive = false"/>
</div>
</template>

<script>
import axios from 'axios'

import ModalAddUser from './modals/ModalAddUser'
import ModalDeleteUser from './modals/ModalDeleteUser'
import ModalUpdateUser from './modals/ModalUpdateUser'
import ModalUserUsage from './modals/ModalUserUsage'

export default {
	name: 'PageAdmin',
	components: { ModalAddUser, ModalDeleteUser, ModalUpdateUser, ModalUserUsage },
	data: function () {
		return {
			loading: true,
			users: [],
			chosenUser: {
				_id: '',
				firstName: '',
				lastName: '',
				email: '',
				store: '',
				district: '',
				forceNewPasswordOnNextLogin: false,
				admin: false
			},
			sort: {
				sortField: 'store',
				sortDirAsc: true
			},
			filter: [
				{ id: 'store', label: 'Store' },
				{ id: 'district', label: 'District' },
				{ id: 'firstName', label: 'Name' }
			],
			sortableTableHeaders: [
				{ sortMethodVariable: 'firstName', label: 'Name' },
				{ sortMethodVariable: 'email', label: 'Email' },
				{ sortMethodVariable: 'store', label: 'Store' },
				{ sortMethodVariable: 'district', label: 'District' },
				{ sortMethodVariable: 'admin', label: 'Admin' }
			],
			selectedFilter: 'store',
			filterText: '',
			addUserModalActive: false,
			deleteUserModalActive: false,
			updateUserModalActive: false,
			userUsageModalActive: false
		}
	},
	filters: {
		abbreviateEmail (email) {
			return email.split('@')[0]
		}
	},
	methods: {
		getAllUsers () {
			axios({
				method: 'get',
				url: '/api/users/adminGetAllUsers',
				headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) }
			})
				.then(response => {
					this.users = response.data.users
					this.loading = false
				})
				.catch(error => {
					console.log(error.msg)
				})
		},
		openDeleteUserModal (user) {
			this.chosenUser = user
			this.deleteUserModalActive = true
		},
		openUpdateUserModal (user) {
			this.chosenUser = user
			this.updateUserModalActive = true
		},
		openUserUsageModal (user) {
			this.chosenUser = user
			this.userUsageModalActive = true
		},
		sortMethod (clickedSortField) {
			if (this.sort.sortField !== clickedSortField) {
				this.sort.sortField = clickedSortField
				this.sort.sortDirAsc = true
			} else {
				this.sort.sortDirAsc = !this.sort.sortDirAsc
			}
			console.log(this.sort.sortField)
		},
		compareValues (key, order = 'asc') {
			return function innerSort (a, b) {
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
		},
		resetHasSeenNewChanges () {
			axios({
				method: 'post',
				url: '/api/users/resetHasSeenNewChanges',
				headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) }
			})
			.then(() => location.reload())
			.catch(error => console.log(error))
		}
	},
	computed: {
		sortedUsers () {
			let originalArray = this.users
			let localArray = []
			if (this.sort.sortDirAsc) {
				localArray = originalArray.sort(this.compareValues(this.sort.sortField))
			} else if (!this.sort.sortDirAsc) {
				localArray = originalArray.sort(this.compareValues(this.sort.sortField, 'desc'))
			}

			if (this.filterText) {
				localArray = localArray.filter(user => user[this.selectedFilter].toLowerCase().includes(this.filterText.toLowerCase()))
			}

			return localArray
		}
	},
	mounted () {
		this.getAllUsers()
	}
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
		margin-bottom: 2rem;

		&:hover {
			background-color: rgba(0, 136, 169, 0.8);
		}

		&:focus {
			outline: none;
		}
	}

	.addUser + button:nth-of-type(n+1) {
		margin-left: 1rem;
	}

	.filterUsers {
		display: flex;
		align-items: center;
		font-size: .9rem;

		* {
			margin: 1rem;
		}

		select {
			border: none;
			border-bottom: 1px solid grey;
			outline: none;
			height: 2rem;
			width: 6rem;
			text-align: center;
			font-size: .9rem;
		}

		.filterSearch {
			display: flex;
			align-items: center;
			border-bottom: 1px solid grey;
			width: 15rem;
			height: 2rem;
			font-size: .9rem;

			i {
				margin: 0 .75rem 0 .25rem;
			}

			input {
				width: 100%;
				height: 100%;
				margin: 0;
				padding: 0;
				border: none;
				outline: none;
				font-size: .9rem;
			}
		}
	}

	.loadingSpinner {
		text-align: center;
		font-size: 2rem;
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
			justify-content: space-between;
		}

		> .actions > i {
			cursor: pointer;
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
