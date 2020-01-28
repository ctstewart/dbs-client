const tmpTotal = ((state) => {
    if (!state.tmp || state.tmp < 0 || isNaN(state.tmp)) {
        return 0
    } else {
        return parseFloat(state.tmp)
    }
})

export default tmpTotal