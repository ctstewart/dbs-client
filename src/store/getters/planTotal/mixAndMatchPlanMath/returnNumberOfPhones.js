const returnNumberOfPhones = ((plansArray) => {
    var localTotal = 0

    var localTotal = plansArray.reduce((accumulator, currentValue) => {
        return parseInt(accumulator) + parseInt(currentValue.numberOfPhones)
    },0)

    if (localTotal < 1) {
        localTotal = 0
    } else if (localTotal > 5) {
        localTotal = 5
    }

    return Number(localTotal)
})

export default returnNumberOfPhones