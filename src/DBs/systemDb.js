// System string: R(1-6)C(1-5)U(1-6)

const system = {
    infrastructureValue: 4500,
    aiv: 700,
    volumeObject: {
        resource: [
            {
                rangeIndex: 1,
                weight: 7,
                description: 'Server'
            },
            {
                rangeIndex: 2,
                weight: 7,
                description: 'Server'
            },
            {
                rangeIndex: 3,
                weight: 5,
                description: 'Power Supply'
            },
            {
                rangeIndex: 4,
                weight: 5,
                description: 'Power Supply'
            },
            {
                rangeIndex: 5,
                weight: 3,
                description: 'PC'
            },
            {
                rangeIndex: 6,
                weight: 3,
                description: 'PC'
            }
        ],
        channel: [
            {
                rangeIndex: 1,
                weight: 9,
                description: 'TCP'
            },
            {
                rangeIndex: 2,
                weight: 5,
                description: 'IP'
            },
            {
                rangeIndex: 3,
                weight: 5,
                description: 'IP'
            },
            {
                rangeIndex: 4,
                weight: 2,
                description: 'Other'
            },
            {
                rangeIndex: 5,
                weight: 2,
                description: 'Other'
            }
        ],
        userAccount: [
            {
                rangeIndex: 1,
                weight: 9,
                description: 'Super Admin'
            },
            {
                rangeIndex: 2,
                weight: 9,
                description: 'Super Admin'
            },
            {
                rangeIndex: 3,
                weight: 8,
                description: 'Admin'
            },
            {
                rangeIndex: 4,
                weight: 8,
                description: 'Admin'
            },
            {
                rangeIndex: 5,
                weight: 1,
                description: 'User'
            },
            {
                rangeIndex: 6,
                weight: 1,
                description: 'User'
            }
        ]
    },
};

export default system;