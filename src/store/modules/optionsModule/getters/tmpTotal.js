const tmpTotal = ((state) => {
    return parseFloat(state.tmp.replace(/\$|,/g, ''))
})

export default tmpTotal