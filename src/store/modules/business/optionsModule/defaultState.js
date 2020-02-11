const defaultState = () => {
    return {
        plans: [
            {
                id: 'Unlimited Basic Phone',
                numberOfPhones: 0,
                cost: 30
            },
            {
                id: 'Unlimited Essentials',
                numberOfPhones: 0,
                cost: 35
            },
            {
                id: 'Unlimited $45',
                numberOfPhones: 0,
                cost: 45
            },
            {
                id: 'Unlimited $50',
                numberOfPhones: 0,
                cost: 50
            },
        ],
        militaryDiscount: {
            isActive: false,
            amount: 5
        },
        twoYear: {
            numberOfPhones: 0,
            cost: 25
        },
        connectedDevices: [
            { id: 'Tablet Essentials', cost: 30, numberOfDevices: 0 },
            { id: 'Tablet', cost: 45, numberOfDevices: 0 },
            { id: 'Jetpack', cost: 45, numberOfDevices: 0 },
            { id: 'Hum+', cost: 10, numberOfDevices: 0 },
            { id: 'HumX', cost: 20, numberOfDevices: 0 },
            { id: 'Homephone', cost: 20, numberOfDevices: 0 },
            { id: 'Gizmo', cost: 5, numberOfDevices: 0 },
            { id: 'Smartwatch', cost: 10, numberOfDevices: 0 },
            { id: 'Arlo', cost: 45, numberOfDevices: 0 }
        ],
        numberOfActivationFees: 0,
        tmp: 0,
        existingDPPValues: [],
        existingCreditValues: [],
        newDPPValues: [],
        newCreditValues: []
    }
}

export default defaultState