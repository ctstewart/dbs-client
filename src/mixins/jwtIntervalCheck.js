import jwt_decode from 'jwt-decode'

const mixin = {
    created () {
        try {
            const decoded = jwt_decode(JSON.parse(localStorage.getItem('jwt')))
            const timeUntilExpInSeconds = decoded.exp - (Date.now() / 1000)
            if (timeUntilExpInSeconds < 60) {
                this.$router.push('/login')
            } else if (timeUntilExpInSeconds >= 60 && timeUntilExpInSeconds <= 600) {
                console.log('Add Refresh Token Please!')
            } else {
                const secondsUntilRefresh = timeUntilExpInSeconds - (10 * 60)
                const millisecondsUntilRefresh = secondsUntilRefresh * 1000
                //console.log(secondsUntilRefresh)
                setTimeout(() => {
                    console.log('Add Refresh Token Please!')
                }, millisecondsUntilRefresh)
            }
        } catch (e) {
            this.$router.push('/login')
        }
    }
}

export default mixin