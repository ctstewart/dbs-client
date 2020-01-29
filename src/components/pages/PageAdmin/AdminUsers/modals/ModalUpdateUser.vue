<template>
<div id="updateUserModal" class="updateUserModal">
    <div class="modal-content">
        <span class="closeBtn" @click="$emit('close-modal')">&times;</span>
        <h2>Create New User</h2>
        <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'First Name', placeholder:'John', meter:false}}" :value="updatedFirstName" v-on:value-changed="updatedFirstName = $event"/>
        <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'Last Name', placeholder:'Doe', meter:false}}" :value="updatedLastName" v-on:value-changed="updatedLastName = $event"/>
        <input-field v-bind="{inputStyle: {initialInputType: 'text', label:'Email', placeholder:'johndoe@wirelessworld.com', meter:false}}" :value="updatedEmail" v-on:value-changed="updatedEmail = $event"/>
        <div>
            <p>Store</p>
            <select v-model="updatedStore">
                <option selected disabled>---Select a store---</option>
                <option v-for="store in stores" :key="store">{{ store }}</option>
            </select>
        </div>
        <div>
            <p>District</p>
            <select v-model="updatedDistrict">
                <option selected disabled>---Select a district---</option>
                <option v-for="district in districts" :key="district">{{ district }}</option>
            </select>
        </div>
        <div v-if="$store.state.superAdmin">
            <p>Admin?</p>
            <label class="adminSwitch">
                <input type="checkbox" :checked="updatedAdmin" @change="updatedAdmin = !updatedAdmin">
                <span class="adminSlider"></span>
            </label>
        </div>
        <span v-if="updateUserError" class="error">{{ updateUserError }}</span>
        <span v-else-if="updateUserMsg" class="msg">{{ updateUserMsg }}. The page will now reload...</span>
        <button v-else @click="updateUser">SUBMIT</button>
    </div>
</div>
</template>

<script>
import axios from 'axios'

import InputField from '@/components/ui/InputField'

export default {
    name: 'ModalUpdateUser',
    components: { InputField },
    props: {
        _id: String,
        firstName: String,
        lastName: String,
        email: String,
        store: String,
        district: String,
        admin: Boolean,
    },
    data() {
        return {
            updatedFirstName: this.firstName,
            updatedLastName: this.lastName,
            updatedEmail: this.email,
            updatedStore: this.store,
            updatedDistrict: this.district,
            updatedAdmin: this.admin,
            updateUserError: '',
            updateUserMsg: '',
            stores: [
                "Admin Staff",
                "Business Rep",
                "Aberdeen",
                "Albert Lea",
                "Ankeny",
                "Atlantic",
                "Aurora",
                "Brookings",
                "Chadron",
                "Chamberlain",
                "Cherokee",
                "Cottage Grove",
                "Denison",
                "East Sioux Falls",
                "Edgerton",
                "Fairmont",
                "Faribault",
                "Hamilton",
                "Hastings NE",
                "Le Mars",
                "Lexington",
                "Lincoln",
                "Madison",
                "McCook",
                "Monticello",
                "Morningside",
                "Northfield",
                "Onawa",
                "Ord",
                "Owatonna North",
                "Owatonna South",
                "Plymouth",
                "Red Wing",
                "River Falls",
                "Rock Valley",
                "Sartell",
                "Sidney",
                "Sioux Center",
                "South Sioux Falls",
                "St. Anthony",
                "Storm Lake",
                "Vermillion",
                "Waseca",
                "West Sioux Falls",
                "Willmar",
                "Worthington",
                "Yankton"
            ],
            districts: [
                "Admin Staff",
                "Aaron Stickney",
                "Adam Harrington",
                "Brooke Samuelson",
                "Chelsea Cahoy",
                "Jason Hansen",
                "Kyle Kortz",
                "Marcus Malcom",
                "Matt De Wit",
                "Scot Suess"
            ]
        }
    },
    methods: {
        updateUser() {
            if (this.$store.state.superAdmin) {
                var axiosUrl = '/api/users/superAdminUpdateUser'
            } else {
                var axiosUrl = '/api/users/adminUpdateUser'
            }
            axios({
                method: 'post',
                url: axiosUrl,
                headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) },
                data: {
                    _id: this._id,
                    firstName: this.updatedFirstName,
                    lastName: this.updatedLastName,
                    email: this.updatedEmail,
                    store: this.updatedStore,
                    district: this.updatedDistrict,
                    admin: this.updatedAdmin
                }
            })
            .then((response) => {
                this.updateUserMsg = response.data.msg
                setTimeout(() => {
                    location.reload()
                }, 3000)
            })
            .catch((error) => {
                this.createUserError = error
                setTimeout(() => {
                    this.createUserError = ''
                }, 2000)
            })
        },
    }
}
</script>

<style lang="less" scoped>
.updateUserModal {
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

        .adminSwitch {
            -webkit-appearance: none;  /* for webkit (safari, chrome) compatibility */
            -moz-appearance: none; /* for firefox compatibility */
            appearance: none;
            background-color: rgba(255,255,255,0.8);
            width: 64px;
            height: 48px;
            border-radius: 5px;
            padding: 0;
            display: block;
            font-size: 16px;
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;

            input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .adminSlider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;

                &:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    -webkit-transition: .4s;
                    transition: .4s;
                }
            }

            input:checked + .adminSlider {
                background-color: #1F596E;
            }

            input:focus + .adminSlider {
                box-shadow: 0 0 1px #1F596E;
            }

            input:checked + .adminSlider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
            }
        }
    }
}
</style>