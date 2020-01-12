<template>
<div class="passwordResetDiv">
    <h2>Thank you!</h2>
    <p>If you gave a valid email, you will get instructions on how to finish resetting your password.</p>
</div>
</template>

<script>
export default {
    name: 'ResetPasswordConfirmation'
}
</script>

<style>
.passwordResetDiv {
    display: -ms-grid;
    display: grid;
    background-color: rgba(255,255,255,.8);
    width: 50%;
    height: 50%;
    margin: 0 auto;
    -ms-grid-row-align: center;
    -ms-grid-column-align: center;
    place-self: center;
    align-self: center;
    justify-self: center;
    border-radius: 5px;
    grid-template-rows: 15% 15% 15% 55%;
    justify-items: center;
}

.passwordResetDiv p,
.passwordResetDiv input,
.passwordResetDiv button {
    width: 80%;
    padding: 1%;
}

.passwordResetDiv p {
    font-size: .9rem;
    margin: 0;
    padding: 0;
    align-self: end;
    font-weight: bold;
}

.passwordResetDiv input {
    margin: 0;
    padding: 0;
    text-indent: .5rem;
    align-self: end;
    height: 2rem;
}

.passwordResetDiv span {
    align-self: center;
    color: red;
}

.passwordResetDiv button {
    align-self: center;
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

.buttonGroup {
    display: -ms-grid;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.buttonGroup > button {
    margin: 5%;
}

.buttonGroup > button:last-child {
    background-color: white;
    color: black;
    border: 1px solid grey;
}
</style>