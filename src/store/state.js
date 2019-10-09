import * as plans from '../data/plans'

const state = {
    chosenPlan: 'Unlimited',
    mixAndMatchPlans: plans.mixAndMatchPlans,
    oldUnlimitedPlans: plans.oldUnlimitedPlans,
    tieredPlans: plans.tieredPlans,
    twoyear: {
        value: 0,
        cost: 20
    },
    basic: {
        value: 0,
        cost: 30
    },
    lineAccess: plans.lineAccess,
    militaryNew: false,
    militaryOld: false,
    responderNew: false,
    responderOld: false,
    discount: '0%',
    numberOfPhones: 0,
    autopay: false,
    numberOfNewDevices: 0,
    tmp: '$0',
    tmpConvertedFromString: 0,
    existingDPPValues: Array.from({ length: 10 }, () => ({ value: '' })),
    existingCreditValues: Array.from({ length: 10 }, () => ({ value: '' })),
    newDPPValues: Array.from({ length: 10 }, () => ({ value: '' })),
    newCreditValues: Array.from({ length: 10 }, () => ({ value: '' }))
}

export { state }