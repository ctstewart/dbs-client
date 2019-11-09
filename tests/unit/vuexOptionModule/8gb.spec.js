import { expect } from 'chai'
import state from '../../../src/store/modules/optionsModule/defaultState'
import getters from '../../../src/store/modules/optionsModule/getters'
import mutations from '../../../src/store/modules/optionsModule/mutations'
import connectedDeviceMath from '../../../src/store/modules/optionsModule/getters/planTotal/connectedDeviceMath'

describe('8gb', () => {
    before(() => {
        mutations.resetState(state)
    })

    it('chosenPlan', () => {
        mutations.mutate(state, {property: 'chosenPlan', with: '8GB'})
        expect(state.chosenPlan).to.equal('8GB')
    })

    it('numberOfPhones', () => {
        mutations.mutate(state, {property: 'numberOfPhonesTieredAndOldUnlimited', with: 5})
        expect(state.numberOfPhonesTieredAndOldUnlimited).to.equal(5)
    })

    it('discount', () => {
        mutations.mutate(state, {property: 'discount', with: '22%'})
        expect(state.discount).to.equal('22%')
    })

    it('twoyear', () => {
        mutations.mutate(state, {property: 'twoyear', with: 2})
        expect(state.twoyear).to.equal(2)
    })

    it('basic', () => {
        mutations.mutate(state, {property: 'basic', with: 3})
        expect(state.basic).to.equal(3)
    })

    var isUnlimited = null
    it('isUnlimited', () => {
        isUnlimited = getters.isUnlimited(state)
        expect(isUnlimited).to.equal(false)
    })

    var connectedDeviceMathResult = null
    it('connectedDevices', () => {
        for (var i=0; i < 1; i++)mutations.incrementConnectedDevice(state, 0)
        for (var i=0; i < 2; i++)mutations.incrementConnectedDevice(state, 1)
        for (var i=0; i < 3; i++)mutations.incrementConnectedDevice(state, 2)
        for (var i=0; i < 4; i++)mutations.incrementConnectedDevice(state, 3)
        for (var i=0; i < 5; i++)mutations.incrementConnectedDevice(state, 4)
        for (var i=0; i < 6; i++)mutations.incrementConnectedDevice(state, 5)
        for (var i=0; i < 7; i++)mutations.incrementConnectedDevice(state, 6)
        for (var i=0; i < 8; i++)mutations.incrementConnectedDevice(state, 7)
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
        expect(connectedDeviceMathResult).to.equal(400)
    })

    var planTotal = null
    it('planTotal', () => {
        planTotal = getters.planTotal(state, {isUnlimited})
        expect(planTotal).to.equal(684.60)
    })

    it('tmp', () => {
        mutations.mutate(state, {property: 'tmp', with: '$45'})
        expect(state.tmp).to.equal('$45')
    })

    var tmpTotal = null
    it('tmpTotal', () => {
        tmpTotal = getters.tmpTotal(state)
        expect(tmpTotal).to.equal(45)
    })

    var dppTotal = null
    it('dppTotal', () => {
        mutations.mutateExistingDpp(state, {index: 0, value: 22.50})
        mutations.mutateExistingDpp(state, {index: 1, value: 50})
        mutations.mutateExistingDpp(state, {index: 2, value: 19.17})
        mutations.mutateExistingDpp(state, {index: 3, value: 25.42})
        mutations.mutateExistingDpp(state, {index: 4, value: 35})
        mutations.mutateExistingDpp(state, {index: 5, value: 52.50})
        mutations.mutateExistingDpp(state, {index: 6, value: 10})
        mutations.mutateExistingDpp(state, {index: 7, value: 21.25})
        mutations.mutateExistingDpp(state, {index: 8, value: 29.58})

        mutations.mutateExistingCredits(state, {index: 0, value: 17.19})
        mutations.mutateExistingCredits(state, {index: 1, value: 30})
        mutations.mutateExistingCredits(state, {index: 2, value: 15})
        mutations.mutateExistingCredits(state, {index: 3, value: 10})
        mutations.mutateExistingCredits(state, {index: 4, value: 8.34})
        mutations.mutateExistingCredits(state, {index: 5, value: 15})
        mutations.mutateExistingCredits(state, {index: 6, value: 19.17})
        mutations.mutateExistingCredits(state, {index: 7, value: 5})
        mutations.mutateExistingCredits(state, {index: 8, value: 10})

        dppTotal = getters.dppTotal(state)
        expect(parseFloat(dppTotal.toFixed(2))).to.equal(135.72)
    })

    var total = null
    it('total', () => {
        total = getters.total(state, {isUnlimited, planTotal, tmpTotal, dppTotal})
        expect(parseFloat(total.toFixed(2))).to.equal(865.32)
    })
})