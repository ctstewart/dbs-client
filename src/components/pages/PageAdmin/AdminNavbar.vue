<template>
<div class="adminNavbar">
    <h3 class="adminTitle">Admin Panel</h3>
    <nav>
        <ul class="nav__links">
            <li><router-link to="/admin/" style="color: #0088a9;">Users</router-link></li>
            <li><router-link to="/admin/">App Usage (Coming Soon)</router-link></li>
            <!-- <li><a @click="$router.push('/')" href="#">Benefit Sheet</a></li> -->
        </ul>
    </nav>
    <div>
        <a @click="$router.push('/')" class="cta"><button class="benefitSheetLink">Benefit Sheet</button></a>
        <a @click="logout" class="cta"><button>Logout</button></a>
    </div>
</div>
</template>

<script>
export default {
    name: 'AdminNavbar',
    methods: {
        logout() {
            localStorage.clear()
            sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less">
.adminNavbar {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: #1F596E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    height: 5rem;

    h3 {
        color: #edf0f1;
    }

    li, a, button {
        font-weight: 500;
        font-size: 16px;
        color: #edf0f1;
        text-decoration: none;
    }

    button {
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

    .benefitSheetLink {
        margin-right: 1rem;
        background-color: white;
        color: rgba(0, 136, 169, 1);

        &:hover {
            background-color: rgba(255, 255, 255, 0.8);
        }
    }

    .nav__links {
        list-style: none;

        li {
            display: inline-block;
            padding: 0px 20px;

            a {
                transition: all 0.3s ease 0s;
            }

            a:hover {
                color: #0088a9;
            }
        }
    }
}
</style>