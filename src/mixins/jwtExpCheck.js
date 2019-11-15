const mixin = {
    created () {
        const nowEpoch = new Date().getTime() / 1000
        var timeUntilExpInSeconds = this.$store.state.jwtExp - nowEpoch

        // Added this so we can handle this 10 min before the actual expiration
        timeUntilExpInSeconds -= 600

        if (timeUntilExpInSeconds < 0) {
            this.$router.push('/login')
        } else {
            setTimeout(() => {
                this.$router.push('/login')
            }, timeUntilExpInSeconds * 1000)
        }
    }
}

export default mixin