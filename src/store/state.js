const state = () => {
    return {
        webappVersion: '1.4.0',
        userInfo: {
            email: '',
            firstName: '',
            lastName: '',
            admin: false,
            superAdmin: false
        },
        userEmail: '',
        jwtExp: null,
    }
}

export default state