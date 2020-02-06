<template>
<div class="sidebar">
    <div class="username">
        <div class="userInitials">
            <span>{{userEmail.slice(0,2).toUpperCase()}}</span>
        </div>
        {{userEmail}}
    </div>
    <div class="sidebar-links">
        <router-link to="/"><i class="fas fa-home"></i>Benefit Sheet</router-link>
        <router-link to="/option/optionOne"><i class="fas fa-dice-one"></i>Option 1</router-link>
        <router-link to="/option/optionTwo"><i class="fas fa-dice-two"></i>Option 2</router-link>
        <router-link to="/admin" v-if="$store.state.admin"><i class="fas fa-users-cog"></i>Admin Panel</router-link>
        <a><i class="fas fa-building"></i>Business Plans</a>
        <router-link to="/changelog"><i class="fas fa-clipboard"></i>Changelog</router-link>
    </div>
    <div class="footer">
        <a @click="logout">Logout</a>
        <router-link to="/changelog">Verison: 1.6.1</router-link>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'LayoutSidebar',
    computed: {
        ...mapState([
            'userEmail',
            'webappVersion',
            'admin'
        ])
    },
    methods: {
        logout: function () {
            sessionStorage.clear()
            localStorage.clear()
            this.$router.push('/login')
        }
    },
}
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

.sidebar {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    padding: 30px 0px;
    position: relative;

    h2 {
        color: #fff;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 30px;
    }

    .username {
        display: grid;
        color: white;
        text-align: center;
        align-self: center;
        padding-bottom: 3%;
        margin-bottom: .5rem;
        font-size: .9rem;
        // font-family: 'Josefin Sans', sans-serif;

        .userInitials {
            display: grid;
            align-self: center;
            justify-self: center;
            color: white;
            border: 1px solid white;
            border-radius: 5px;
            padding: .5rem;
            margin-bottom: .75rem;

            span {
                align-self: center;
                justify-self: center;
                font-size: 2rem;
                font-family: 'Montserrat', sans-serif;
            }
        }
    }

    .sidebar-links {
        display: flex;
        flex-direction: column;
        color: white;

        a {
            color: white;
            padding: 15px;
            border-bottom: 1px solid #bdb8d7;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            border-top: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;

            .fas {
                width: 2rem;
            }

            &:hover, &.router-link-exact-active {
                background-color: rgba(0,0,0,.2);
            }
        }
    }

    .footer {
        position: absolute;
        display: flex;
        justify-content: space-between;
        bottom: .4rem;
        padding: 0 .65rem;
        width: 100%;
        font-size: 1rem;

        a {
            color: white;
            cursor: pointer;
            text-decoration: underline;
        }
    }
}


</style>