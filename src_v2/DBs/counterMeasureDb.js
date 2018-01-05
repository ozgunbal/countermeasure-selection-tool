// System string: R(1-6)C(1-5)U(1-6)

const countermeasures = [
    {
        code: 'C1',
        rcu: 'R(1)C(3)U(1-3)',
        ef: 0.8,
    },
    {
        code: 'C2',
        rcu: 'R(1-3)C(1-2)U(1-3)',
        ef: 0.7,
    },
    {
        code: 'C3',
        rcu: 'R(1-3)C(2-3)U(1-6)',
        ef: 0.38,
    }
    // add more;
    // rori specific to attack!!
]

export default countermeasures;