import { expect } from 'chai'
import state from '../../../src/store/modules/optionsModuleConsumer/defaultState'
import getters from '../../../src/store/modules/optionsModuleConsumer/getters'
import mutations from '../../../src/store/modules/optionsModuleConsumer/mutations'
import connectedDeviceMath from '../../../src/store/modules/optionsModuleConsumer/getters/planTotal/connectedDeviceMath'

describe('mixAndMatch1', () => {
    before(() => {
        mutations.resetState(state)
    })

    it('chosenPlan', () => {
        mutations.mutate(state, {property: 'chosenPlan', with: 'Unlimited'})
        expect(state.chosenPlan).to.equal('Unlimited')
    })

    it('numberOfPhones', () => {
        mutations.setMixAndMatchPlans(state, {index: 0, value: 0})
        mutations.setMixAndMatchPlans(state, {index: 1, value: 0})
        mutations.setMixAndMatchPlans(state, {index: 2, value: 1})
        mutations.setMixAndMatchPlans(state, {index: 3, value: 0})
        mutations.setMixAndMatchPlans(state, {index: 4, value: 0})
        mutations.setMixAndMatchPlans(state, {index: 5, value: 0})
        mutations.setMixAndMatchPlans(state, {index: 6, value: 0})
        mutations.setMixAndMatchPlans(state, {index: 7, value: 0})
        mutations.setMixAndMatchPlans(state, {index: 8, value: 0})
        const mixAndMatchNumberOfPhonesAndId = getters.mixAndMatchNumberOfPhonesAndId(state)
        const numberOfPhones = mixAndMatchNumberOfPhonesAndId.reduce((accumulator, currentValue) => {
            return parseInt(accumulator) + parseInt(currentValue.numberOfPhones)
        },0)
        expect(numberOfPhones).to.deep.equal(1)
    })

    it('autopay', () => {
        expect(state.autopay).to.equal(false)
    })

    it('discount', () => {
        expect(state.militaryNew).to.equal(false)
    })

    it('twoyear', () => {
        expect(state.twoyear).to.equal(0)
    })

    it('basic', () => {
        expect(state.basic).to.equal(0)
    })

    var isUnlimited = null
    it('isUnlimited', () => {
        isUnlimited = getters.isUnlimited(state)
        expect(isUnlimited).to.equal(true)
    })

    var connectedDeviceMathResult = null
    it('connectedDevices', () => {
        for (var i=0; i < 5; i++)mutations.incrementConnectedDevice(state, 0)
        for (var i=0; i < 3; i++)mutations.incrementConnectedDevice(state, 1)
        connectedDeviceMathResult = connectedDeviceMath({
            'chosenPlan': state.chosenPlan,
            'isUnlimited': getters.isUnlimited(state),
            'mixAndMatchPlansArray': state.mixAndMatchPlans.plans,
            'connectedDevicesArray': state.connectedDevices,
            'oldUnlimitedPlansArray': state.oldUnlimitedPlans,
            'tieredPlansArray': state.tieredPlans,
            'militaryNew': state.militaryNew,
            'militaryOld': state.militaryOld
        })
        expect(connectedDeviceMathResult).to.equal(150)
    })

    var planTotal = null
    it('planTotal', () => {
        planTotal = getters.planTotal(state, {isUnlimited})
        expect(planTotal).to.equal(240)
    })

    it('tmp', () => {
        mutations.mutate(state, {property: 'tmp', with: 45})
        expect(state.tmp).to.equal(45)
    })

    var tmpTotal = null
    it('tmpTotal', () => {
        tmpTotal = getters.tmpTotal(state)
        expect(tmpTotal).to.equal(45)
    })

    var dppTotal = null
    it('dppTotal', () => {
        mutations.mutateExistingDpp(state, {index: 0, value: 22.50 * 100})
        mutations.mutateExistingDpp(state, {index: 1, value: 50 * 100})
        mutations.mutateExistingDpp(state, {index: 2, value: 19.17 * 100})
        mutations.mutateExistingDpp(state, {index: 3, value: 25.42 * 100})
        mutations.mutateExistingDpp(state, {index: 4, value: 35 * 100})
        mutations.mutateExistingDpp(state, {index: 5, value: 52.50 * 100})
        mutations.mutateExistingDpp(state, {index: 6, value: 10 * 100})
        mutations.mutateExistingDpp(state, {index: 7, value: 21.25 * 100})
        mutations.mutateExistingDpp(state, {index: 8, value: 29.58 * 100})

        mutations.mutateExistingCredits(state, {index: 0, value: 17.19 * 100})
        mutations.mutateExistingCredits(state, {index: 1, value: 30 * 100})
        mutations.mutateExistingCredits(state, {index: 2, value: 15 * 100})
        mutations.mutateExistingCredits(state, {index: 3, value: 10 * 100})
        mutations.mutateExistingCredits(state, {index: 4, value: 8.34 * 100})
        mutations.mutateExistingCredits(state, {index: 5, value: 15 * 100})
        mutations.mutateExistingCredits(state, {index: 6, value: 19.17 * 100})
        mutations.mutateExistingCredits(state, {index: 7, value: 5 * 100})
        mutations.mutateExistingCredits(state, {index: 8, value: 10 * 100})

        dppTotal = getters.dppTotal(state)
        expect(parseFloat(dppTotal.toFixed(2))).to.equal(135.72)
    })

    var total = null
    it('total', () => {
        total = getters.total(state, {isUnlimited, planTotal, tmpTotal, dppTotal})
        expect(parseFloat(total.toFixed(2))).to.equal(420.72)
    })
})