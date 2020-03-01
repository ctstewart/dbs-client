<template>
<div id="addUserModal" class="addUserModal">
    <div class="modal-content">
        <span class="closeBtn" @click="$emit('close-modal')">&times;</span>
        <h2>Create New User</h2>
        <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'First Name', placeholder:'John', meter:false}}" :value="firstName" v-on:value-changed="firstName = $event"/>
        <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'Last Name', placeholder:'Doe', meter:false}}" :value="lastName" v-on:value-changed="lastName = $event"/>
        <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'Email', placeholder:'johndoe@wirelessworld.com', meter:false}}" :value="email" v-on:value-changed="email = $event"/>
        <div>
            <p>Store</p>
            <select v-model="store">
                <option selected disabled>---Select a store---</option>
                <option v-for="store in stores" :key="store">{{ store }}</option>
            </select>
        </div>
        <div>
            <p>District</p>
            <select v-model="district">
                <option selected disabled>---Select a district---</option>
                <option v-for="district in districts" :key="district">{{ district }}</option>
            </select>
        </div>
        <span v-if="createUserError" class="error">{{ createUserError }}</span>
        <span v-else-if="createUserMsg" class="msg">{{ createUserMsg }}. The page will now reload...</span>
        <button v-else @click="createUser">SUBMIT</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'

import InputField from '@/components/ui/InputField'

export default {
	name: 'ModalAddUser',
	components: { InputField },
	data () {
		return {
			firstName: '',
			lastName: '',
			email: '',
			store: '---Select a store---',
			district: '---Select a district---',
			createUserError: '',
			createUserMsg: '',
			stores: [
				'Admin Staff',
				'Business Rep',
				'Aberdeen',
				'Albert Lea',
				'Ankeny',
				'Atlantic',
				'Aurora',
				'Brookings',
				'Chadron',
				'Chamberlain',
				'Cherokee',
				'Cottage Grove',
				'Denison',
				'East Sioux Falls',
				'Edgerton',
				'Fairmont',
				'Faribault',
				'Hamilton',
				'Hastings NE',
				'Le Mars',
				'Lexington',
				'Lincoln',
				'Madison',
				'McCook',
				'Monticello',
				'Morningside',
				'Northfield',
				'Onawa',
				'Ord',
				'Owatonna North',
				'Owatonna South',
				'Plymouth',
				'Red Wing',
				'River Falls',
				'Rock Valley',
				'Sartell',
				'Sidney',
				'Sioux Center',
				'South Sioux Falls',
				'St. Anthony',
				'Storm Lake',
				'Vermillion',
				'Waseca',
				'West Sioux Falls',
				'Willmar',
				'Worthington',
				'Yankton'
			],
			districts: [
				'Admin Staff',
				'Aaron Stickney',
				'Adam Harrington',
				'Brooke Samuelson',
				'Chelsea Cahoy',
				'Jason Hansen',
				'Kyle Kortz',
				'Marcus Malcom',
				'Matt De Wit',
				'Scot Suess'
			]
		}
	},
	methods: {
		createUser () {
			axios({
				method: 'post',
				url: '/api/users/adminCreateNewUser',
				headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) },
				data: {
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					store: this.store,
					district: this.district
				}
			})
				.then((response) => {
					this.createUserMsg = response.data.msg
					setTimeout(() => {
						location.reload()
					}, 5000)
				})
				.catch((error) => {
					this.createUserError = error
					setTimeout(() => {
						this.createUserError = ''
					}, 2000)
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
        margin: 3rem auto;
        padding: 1rem;
        width: 50%;
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

        > div {
            display: -ms-grid;
            display: grid;
            margin: 2rem 0;
        }

        p {
            font-size: .9rem;
            margin: 0;
            padding-bottom: .5rem;
            align-self: end;
            font-weight: bold;
        }

        select {
            margin: 0;
            padding: 0;
            text-indent: .5rem;
            height: 2rem;
            border: 1px solid #1F596E;
            border-radius: 5px;

            &:focus {
                outline: none;
            }
        }

        button {
            align-self: center;
            justify-self: end;
            color: white;
            background-color: #1F596E;
            border-radius: 5px;
            width: 7rem;
            height: 3.5rem;
            border: none;
            font-weight: bold;
            font-size: 20px;
            outline: none;
            cursor: pointer;
        }

        .error {
            color: red;
        }

        .msg {
            color: green;
        }
    }
}
</style>
