export const filters = [
    "positive",
    "offensive",
    "violent",
    "entertainment",
    "suggestive",
    "educational",
    "health",
    "sexual",
    "games",
    "hate",
    "drugs"
]


export const rules = [
    [
        [0, 5, 10],
        [0, 15, 35],
        [0, 70, 90]
    ],
    [
        [0, 6, 12],
        [0, 18, 38],
        [0, 65, 85]
    ],
    [
        [0, 7, 14],
        [0, 22, 42],
        [0, 65, 80]
    ],
    [
        [0, 8, 16],
        [0, 25, 45],
        [0, 60, 80]
    ],
    [
        [0, 9, 18],
        [0, 30, 50],
        [0, 60, 80]
    ]
]


export const getRules = (age) => {
    let index = 0;
    if (age >= 2 && age <= 5) {
        index = 0;
    } else if (age > 5 && age <= 8) {
        index = 1;
    } else if (age > 8 && age <= 12) {
        index = 2;
    } else if (age > 12 && age <= 15) {
        index = 3;
    } else if (age > 15) {
        index = 4;
    }

    return rules[index];
}