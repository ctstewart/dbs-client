// SAVE THIS FOR FUTURE IMPLEMENTATION OF A REFRESH TOKEN

/* import jwt_decode from 'jwt-decode'
import axios from 'axios'

const mixin = {
  created () {
    try {
      const refreshToken = (token) => {
        axios.get('/api/users/renewToken', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
          .then((response) => {
            localStorage.removeItem('jwt')
            const parsed = JSON.stringify(response.data.token)
            console.log(response.data.token)
            localStorage.setItem('jwt', parsed)
          })
          .catch((error) => {
            console.log(error)
            localStorage.clear()
            this.$router.push('/login')
          })
      }

      const decoded = jwt_decode(JSON.parse(localStorage.getItem('jwt')))
      const timeUntilExpInSeconds = decoded.exp - (Date.now() / 1000)
      if (timeUntilExpInSeconds < 60) {
        this.$router.push('/login')
      } else if (timeUntilExpInSeconds >= 60 && timeUntilExpInSeconds <= 600) {
        console.log('Add Refresh Token Please!')
      } else {
        const secondsUntilRefresh = timeUntilExpInSeconds - (10 * 60)
        const millisecondsUntilRefresh = secondsUntilRefresh * 1000
        // console.log(secondsUntilRefresh)
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
 */
