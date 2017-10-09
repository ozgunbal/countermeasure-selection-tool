export const systemVolume = {
    resource: [
        {
            rangeIndex: 1,
            weight: 4,
            description: 'server'
        },
        {
            rangeIndex: 2,
            weight: 7,
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
            weight: 2,
            description: 'User'
        }
    ]
}

export const systemVolumeLarge = {
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
}

export const volumeOne = {
    resource: [
        {
            rangeIndex: 1,
            weight: 4,
            description: 'server'
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
        }
    ],
    userAccount: [
        {
            rangeIndex: 3,
            weight: 2,
            description: 'User'
        }
    ]
}

export const volumeTwo = {
    resource: [
        {
            rangeIndex: 2,
            weight: 7,
            description: 'PC'
        }
    ],
    channel: [
        {
            rangeIndex: 3,
            weight: 2,
            description: 'Other'
        }
    ],
    userAccount: [
        {
            rangeIndex: 1,
            weight: 9,
            description: 'Super Admin'
        }
    ]
}