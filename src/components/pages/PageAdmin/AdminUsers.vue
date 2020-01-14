<template>
<div class="usersContainer">
    <button class="addUser" @click="modalActive = true">Add User</button>
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
            <i class="fas fa-trash" @click="deleteUser(user._id)"></i>
        </div>
    </div>
    <div v-if="modalActive" id="addUserModal" class="addUserModal">
        <div class="modal-content">
            <span class="closeBtn" @click="modalActive = false">&times;</span>
            <h2>Create New User</h2>
            <div>
                <p>First Name</p>
                <input v-model="firstName"/>
            </div>
            <div>
                <p>Last Name</p>
                <input v-model="lastName"/>
            </div>
            <div>
                <p>Email</p>
                <input v-model="email"/>
            </div>
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
            <div>
                <p>Temporary Password</p>
                <input v-model="temporaryPassword"/>
            </div>
            <span v-if="createUserError">{{ createUserError }}</span>
            <button v-else @click="createUser">SUBMIT</button>
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
            adminVerified: false,
            modalActive: false,
            firstName: '',
            lastName: '',
            email: '',
            store: '---Select a store---',
            district: '---Select a district---',
            temporaryPassword: '',
            createUserError: '',
            stores: [                                                                                                                                                                               
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
        createUser() {
            axios({
                method: 'post',
                url: '/api/users/adminCreateNewUser',
                headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) },
                data: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    store: this.store,
                    district: this.district,
                    password: this.temporaryPassword
                }
            })
            .then((response) => {
                location.reload()
            })
            .catch((error) => {
                this.createUserError = error
            })
        },
        deleteUser(_id) {
            axios({
                method: 'delete',
                url: '/api/users/adminDeleteUser',
                headers: { authorization: 'Bearer ' + JSON.parse(localStorage.getItem('jwt')) },
                data: { _id }
            })
            .then((response) => {
                location.reload()
            })
            .catch((error) => {
                this.createUserError = error
            })
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

            input, select {
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

            span {
                color: red;
            }
        }
    }
}
</style>