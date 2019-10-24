import * as plans from './planData/plans'

const defaultState = () => {
    return {
        chosenPlan: 'Unlimited',
        mixAndMatchPlans: plans.mixAndMatchPlans,
        oldUnlimitedPlans: plans.oldUnlimitedPlans,
        tieredPlans: plans.tieredPlans,
        twoyear: 0,
        basic: 0,
        connectedDevices: plans.connectedDevices,
        autopay: false,
        militaryNew: false,
        militaryOld: false,
        responderNew: false,
        responderOld: false,
        discount: '0%',
        numberOfPhonesTieredAndOldUnlimited: 0,
        numberOfNewDevices: 0,
        tmp: '$0',
        existingDPPValues: Array.from({ length: 10 }, () => ({ value: '' })),
        existingCreditValues: Array.from({ length: 10 }, () => ({ value: '' })),
        newDPPValues: Array.from({ length: 10 }, () => ({ value: '' })),
        newCreditValues: Array.from({ length: 10 }, () => ({ value: '' }))
    }
}

export default defaultState