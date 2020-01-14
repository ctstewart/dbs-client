<template>
<div class="adminNavbar">
    <h3 class="adminTitle">Admin Panel</h3>
    <nav>
        <ul class="nav__links">
            <li><a href="#">Users</a></li>
            <li><a href="#">App Usage (Coming Soon)</a></li>
        </ul>
    </nav>
    <a href="#" class="cta"><button>Logout</button></a>
</div>
</template>

<script>
export default {
    name: 'AdminNavbar'
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
    }

    button:hover {
        background-color: rgba(0, 136, 169, 0.8);
    }

    button:focus {
        outline: none;
    }
}

.adminTitle {
    cursor: pointer;
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
</style>