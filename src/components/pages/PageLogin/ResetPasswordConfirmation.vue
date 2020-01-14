<template>
<div class="passwordResetDiv">
    <h2>Thank you!</h2>
    <p>"{{email}}" will be sent instructions on how to finish resetting your password.</p>
</div>
</template>

<script>
export default {
    name: 'ResetPasswordConfirmation',
    props: ['email']
}
</script>

<style lang="less">
.passwordResetDiv {
    display: -ms-grid;
    display: grid;
    grid-template-rows: 15% 30% 30% 25%;
    border-right: 1px solid grey;
    
    p {
        font-size: .9rem;
        margin: 0;
        padding-bottom: .5rem;
        align-self: end;
        font-weight: bold;
    }
}
 </style>