const copyModuleOptionOneToOptionTwo = ((state) => {
    Object.assign(state['optionTwo'], state['optionOne'])
})

const mutations = {
    copyModuleOptionOneToOptionTwo
}

export default mutations