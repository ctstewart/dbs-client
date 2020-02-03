<template>
<div class="sidebar">
    <div class="username">
        <div class="userInitials">
            <span>{{userEmail.slice(0,2).toUpperCase()}}</span>
        </div>
        <br>
        {{userEmail}}
    </div>
    <router-link to="/" class="router-link">Benefit Sheet</router-link>
    <router-link to="/option/optionOne" class="router-link">Option 1</router-link>
    <router-link to="/option/optionTwo" class="router-link">Option 2</router-link>
    <div class="versionAndLogout">
        <a class="logout" @click="logout">Logout</a>
        <router-link v-if="admin" to="/admin">Admin Panel</router-link>
        <router-link to="/changelog" class="versionFormatting">Version: 1.6.1</router-link>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Layoutsidebar',
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
    }
}
</script>

<style lang="less" scoped>
.sidebar {
    background-color: rgba(0,0,0,.4);
    height: 100%;
    display: grid;
    grid-template-rows: 25% 15% 15% 15% 30%;

    @media print {
        display: none !important;
    }

    button {
        background-color: rgba(255,255,255,.8);
        border-radius: 10px;
        border: none;
        margin: 4% 5%;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
    }

    .router-link {
        color: black;
        display: grid;
        align-items: center;
        justify-items: center;
        text-decoration: none;
        background-color: rgba(255,255,255,.8);
        border-radius: 10px;
        border: none;
        margin: 4% 5%;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
    }

    .router-link-exact-active {
        background-color: transparent !important;
        color: rgba(255,255,255,.8) !important;
        border: 1px solid rgba(255,255,255,.8) !important;
    }

    .username, .versionAndLogout {
        align-self: end;
        color: rgba(255,255,255,.8);
        font-size: 14px;
    }

    .username {
        display: grid;
        text-align: center;
        align-self: center;
        padding-bottom: 3%;

        .userInitials {
            display: grid;
            align-self: center;
            justify-self: center;
            border: 1px solid white;
            border-radius: 5px;
            padding: .5rem;

            span {
                align-self: center;
                justify-self: center;
                font-size: 2rem;
            }
        }

        img {
            margin-bottom: 1%;
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,.8);
        }
    }

    .versionAndLogout {
        display: flex;
        justify-content: space-between;
        font-size: .9rem;
        margin: 0 3% 3%;
        cursor: pointer;

        .logout {
            text-decoration: underline;
        }

        a {
            color: white;
        }

        .versionFormatting {
            text-align: right;
        }

        @media (max-width: 1280px) {
            font-size: .75rem;
        }
    }
}
</style>
