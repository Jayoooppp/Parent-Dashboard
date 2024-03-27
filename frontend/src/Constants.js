export const filters = [
    "positive",
    "offensive",
    "violent",
    "entertainment",
    "suggestive",
    "educational",
    "health",
    "nudity",
    "games",
    "hate",
    "drugs"
]


export const rules = [
    [
        [0, 5, 10],
        [0, 40, 75],
        [0, 35, 70]
    ],
    [
        [0, 6, 12],
        [0, 40, 75],
        [0, 40, 75]
    ],
    [
        [0, 7, 14],
        [0, 45, 75],
        [0, 45, 75]
    ],
    [
        [0, 8, 16],
        [0, 50, 80],
        [0, 50, 80]
    ],
    [
        [0, 9, 18],
        [0, 55, 85],
        [0, 55, 85]
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