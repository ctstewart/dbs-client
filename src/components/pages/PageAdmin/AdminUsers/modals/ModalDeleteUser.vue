<template>
<div id="addUserModal" class="addUserModal">
    <div class="modal-content">
        <span class="closeBtn" @click="$emit('close-modal')">&times;</span>
        <h2>Delete User</h2>
        <p>Are you sure you want to delete {{ firstName }} {{ lastName }}?</p>
        <div>
            <button @click="deleteUser" class="confirm">Yes</button>
            <button @click="$emit('close-modal')" class="cancel">Cancel</button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ModalAddUser',
	props: {
		_id: String,
		firstName: String,
		lastName: String,
		store: String,
		district: String
	},
	methods: {
		deleteUser () {
			axios({
				method: 'delete',
				url: '/api/users/adminDeleteUser',
				headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) },
				data: { _id: this._id }
			})
				.then((response) => {
					location.reload()
				})
				.catch((error) => {
					this.createUserError = error
				})
		}
	}
}
</script>

<style lang="less" scoped>
.addUserModal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);

    .modal-content {
        background-color: #f4f4f4;
        margin: 5rem auto;
        padding: 1rem;
        width: 40%;
        box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);

        .closeBtn {
            color: #ccc;
            float: right;
            font-size: 2rem;

            &:hover, &:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
            }
        }

        p {
            font-size: 1rem;
            margin: 1rem 0;
            padding-bottom: .5rem;
            align-self: end;
            font-weight: bold;
        }

        button {
            margin: 1rem .25rem;
            align-self: center;
            justify-self: end;
            border-radius: 5px;
            width: 7rem;
            height: 3.5rem;
            border: none;
            font-weight: bold;
            font-size: 20px;
            outline: none;
            cursor: pointer;
        }

        .confirm {
            border: none;
            color: white;
            background-color: #1F596E;
        }

        .cancel {
            border: 1px solid #1F596E;
            color: #1F596E;
            background-color: white;
        }
    }
}
</style>
