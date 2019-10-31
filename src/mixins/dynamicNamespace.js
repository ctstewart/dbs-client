import optionsModule from '@/store/modules/optionsModule'

var mixin = {
    created() {
        this.$store.registerModule(this.$route.params.vuexModule, optionsModule)
    },

    beforeRouteUpdate (to, from, next) {
        this.$store.unregisterModule(from.params.vuexModule, optionsModule)
        this.$store.registerModule(to.params.vuexModule, optionsModule)
        next()
    },
}

export default mixin