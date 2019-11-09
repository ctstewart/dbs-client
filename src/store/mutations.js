const copyModuleOptionOneToOptionTwo = ((state) => {
    Object.assign(state['optionTwo'], state['optionOne'])
})

const mutate = ((state, payload) => {
    state[payload.property] = payload.with
})

const mutations = {
    copyModuleOptionOneToOptionTwo,
    mutate,
}

export default mutations