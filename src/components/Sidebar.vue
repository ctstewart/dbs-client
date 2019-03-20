<template>
    <div class="sidebar">
        <div class="username"><img src="../assets/tempUserIcon.png"><br>cstewart@wirelessworldus.com</div>
        <button onclick="location.href='benefitSheet.html'" type="button">Benefit Sheet</button>
        <button onclick="location.href='option1.html'" type="button">Option 1</button>
        <button onclick="" type="button">Option 2</button>
        <button onclick="location.href='login.html'" type="button">Logout</button>
        <a class="version" href="changelog.html">Version:</a>
    </div>
</template>

<script>
</script>

<style scoped>
    .sidebar {
            background-color: rgba(0,0,0,.4);
            height: 100%;
            display: grid;
            grid-template-rows: 25% 15% 15% 15% 15% 15%;
    }

    .sidebar button {
            background-color: rgba(255,255,255,.8);
            border-radius: 10px;
            border: none;
            margin: 4% 5%;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            outline: none;
    }

    .username, .version {
            align-self: end;
            text-align: center;
            color: rgba(255,255,255,.8);
            font-size: 14px;
            /*visibility: hidden;*/
    }

    .username {
            align-self: center;
            /*border-bottom: 1px solid rgba(255,255,255,.8);*/
            padding-bottom: 3%;
    }

    .version {
        font-size: 20px;
            margin-bottom: 3%;
    }

    img {
            margin-bottom: 1%;
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,.8);
    }
</style>
