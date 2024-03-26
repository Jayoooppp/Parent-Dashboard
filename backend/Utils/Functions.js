import Analysis from "../Model/Analysis.js"

// get previsious behavioral analysis of children 
// While Fetching previous analysis we need make sure that we are fetching yesterdays behavioral analysis
export const getPreviousAnalysis = async (userId) => {
    try {
        await Analysis.findOne({ children: userId }).sort({ date: -1 }).then((analysis) => {
            return res.status(203).json(analysis)
        })
        return res.status(404).json({ message: "No Data Found" })
    } catch (error) {
        console.log(error)
    }
}
// Test data
const children_data = {
    "Positive or Neutral": 120,
    "Offensive": 300,
    "Violent": 200,
    "Entertainment": 230,
    "Suggestive or Adult": 90,
    "Educational": 490,
    "Health & Sports": 330,
    "Explicit Nudity": 80,
    "Games": 190,
    "Hate Symbols": 50,
    "Drugs & Alcohol": 100,
    "total_time": 2180
};

const type = {
    "Good": ["Positive or Neutral", "Educational", "Health & Sports", "Games"],
    "Entertainment": ["Entertainment", "Social Media", "Games"],
    "Inappropriate": ["Offensive", "Violent", "Suggestive or Adult", "Explicit Nudity", "Hate Symbols", "Drugs & Alcohol"],
}



const previous_analysis = {
    "Positive or Neutral": "Moderate",
    "Offensive": "None",
    "Violent": "Extensive",
    "Entertainment": "Minimal",
    "Suggestive or Adult": "Moderate",
    "Educational": "Minimal",
    "Health & Sports": "Moderate",
    "Explicit Nudity": "None",
    "Games": "Moderate",
    "Hate Symbols": "None",
    "Drugs & Alcohol": "Extensive"
};


// export const BehavioralAnalysis = (children_data, age, previous_analysis) => {
//     let percentage_time_spent = {};
//     for (let key in children_data) {
//         if (key !== "total_time") {
//             percentage_time_spent[key] = (children_data[key] / children_data["total_time"]) * 100;
//         }
//     }
//     let category_analysis = {};
//     if (age >= 2 && age <= 5) {
//         for (let key in percentage_time_spent) {
//             if (type.Inappropriate.includes(key)) {
//                 if (percentage_time_spent[key] > 0 && percentage_time_spent[key] <= 5) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 5 && percentage_time_spent[key] <= 10) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 10) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else if (type.Entertainment.includes(key)) {
//                 if (percentage_time_spent[key] > 20 && percentage_time_spent[key] <= 40) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 40 && percentage_time_spent[key] <= 75) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 75) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else {
//                 if (percentage_time_spent[key] > 15 && percentage_time_spent[key] <= 35) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 35 && percentage_time_spent[key] <= 70) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 70) {
//                     category_analysis[key] = "Extensive";
//                 }

//             }
//         }
//     } else if (age > 5 && age <= 8) {
//         for (let key in percentage_time_spent) {
//             if (type.Inappropriate.includes(key)) {
//                 if (percentage_time_spent[key] > 0 && percentage_time_spent[key] <= 6) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 6 && percentage_time_spent[key] <= 12) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 12) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else if (type.Entertainment.includes(key)) {
//                 if (percentage_time_spent[key] > 20 && percentage_time_spent[key] <= 40) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 40 && percentage_time_spent[key] <= 75) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 75) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else {
//                 if (percentage_time_spent[key] > 20 && percentage_time_spent[key] <= 40) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 40 && percentage_time_spent[key] <= 75) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 75) {
//                     category_analysis[key] = "Extensive";
//                 }
//             }
//         }
//     } else if (age > 8 && age <= 12) {
//         for (let key in percentage_time_spent) {
//             if (type.Inappropriate.includes(key)) {
//                 if (percentage_time_spent[key] > 0 && percentage_time_spent[key] <= 7) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 7 && percentage_time_spent[key] <= 14) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 14) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else if (type.Entertainment.includes(key)) {
//                 if (percentage_time_spent[key] > 25 && percentage_time_spent[key] <= 45) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 45 && percentage_time_spent[key] <= 75) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 75) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else {
//                 if (percentage_time_spent[key] > 25 && percentage_time_spent[key] <= 45) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 45 && percentage_time_spent[key] <= 75) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 75) {
//                     category_analysis[key] = "Extensive";
//                 }
//             }
//         }
//     } else if (age > 12 && age <= 15) {
//         for (let key in percentage_time_spent) {
//             if (type.Good.includes(key)) {
//                 if (percentage_time_spent[key] > 0 && percentage_time_spent[key] <= 8) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 8 && percentage_time_spent[key] <= 16) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 16) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else if (type.Entertainment.includes(key)) {
//                 if (percentage_time_spent[key] > 30 && percentage_time_spent[key] <= 50) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 50 && percentage_time_spent[key] <= 80) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 80) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else {
//                 if (percentage_time_spent[key] > 30 && percentage_time_spent[key] <= 50) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 50 && percentage_time_spent[key] <= 80) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 80) {
//                     category_analysis[key] = "Extensive";
//                 }
//             }
//         }
//     } else if (age > 15) {
//         for (let key in percentage_time_spent) {
//             if (type.Good.includes(key)) {
//                 if (percentage_time_spent[key] > 0 && percentage_time_spent[key] <= 9) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 9 && percentage_time_spent[key] <= 18) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 18) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else if (type.Entertainment.includes(key)) {
//                 if (percentage_time_spent[key] > 35 && percentage_time_spent[key] <= 55) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 55 && percentage_time_spent[key] <= 85) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 85) {
//                     category_analysis[key] = "Extensive";
//                 }
//             } else {
//                 if (percentage_time_spent[key] > 35 && percentage_time_spent[key] <= 55) {
//                     category_analysis[key] = "Minimal";
//                 } else if (percentage_time_spent[key] > 55 && percentage_time_spent[key] <= 85) {
//                     category_analysis[key] = "Moderate";
//                 } else if (percentage_time_spent[key] > 85) {
//                     category_analysis[key] = "Extensive";
//                 }
//             }
//         }
//     }
//     for (let key in category_analysis) {
//         if (category_analysis[key] === "Minimal") {
//             if (previous_analysis[key] === "Minimal") {
//                 category_analysis[key] = "Minimal";
//             } else if (previous_analysis[key] === "Moderate" || previous_analysis[key] === "Extensive") {
//                 category_analysis[key] = "Moderate";
//             }
//         } else if (category_analysis[key] === "Moderate") {
//             if (previous_analysis[key] === "Minimal") {
//                 category_analysis[key] = "Moderate";
//             } else if (previous_analysis[key] === "Moderate" || previous_analysis[key] === "Extensive") {
//                 category_analysis[key] = "Extensive";
//             }
//         } else if (category_analysis[key] === "Extensive") {
//             if (previous_analysis[key] === "Minimal" || previous_analysis[key] === "Moderate") {
//                 category_analysis[key] = "Extensive";
//             }
//         }
//     }
//     return category_analysis;
// }
// we can write above code more efficiently by creating array by ages, then good, entertainment and inappropriate categories we can write rules

// age 2-5 as 0
// age 5-8 as 1
// age 8-12 as 2
// age 12-15 as 3
// age 15-100 as 4

// Inappropriate as 0
// Entertainment as 1
// Good as 2


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

export const BehavioralAnalysis = (children_data, age, previous_analysis) => {
    let percentage_time_spent = {};
    for (let key in children_data) {
        if (key !== "total_time") {
            percentage_time_spent[key] = (children_data[key] / children_data["total_time"]) * 100;
        }
    }
    let category_analysis = {};
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
    for (let key in percentage_time_spent) {
        if (type.Inappropriate.includes(key)) {
            if (percentage_time_spent[key] > rules[index][0][0] && percentage_time_spent[key] <= rules[index][0][1]) {
                category_analysis[key] = "Minimal";
            } else if (percentage_time_spent[key] > rules[index][0][1] && percentage_time_spent[key] <= rules[index][0][2]) {
                category_analysis[key] = "Moderate";
            } else if (percentage_time_spent[key] > rules[index][0][2]) {
                category_analysis[key] = "Extensive";
            }
        } else if (type.Entertainment.includes(key)) {
            if (percentage_time_spent[key] > rules[index][1][0] && percentage_time_spent[key] <= rules[index][1][1]) {
                category_analysis[key] = "Minimal";
            } else if (percentage_time_spent[key] > rules[index][1][1] && percentage_time_spent[key] <= rules[index][1][2]) {
                category_analysis[key] = "Moderate";
            } else if (percentage_time_spent[key] > rules[index][1][2]) {
                category_analysis[key] = "Extensive";
            }
        } else {
            if (percentage_time_spent[key] > rules[index][2][0] && percentage_time_spent[key] <= rules[index][2][1]) {
                category_analysis[key] = "Minimal";
            } else if (percentage_time_spent[key] > rules[index][2][1] && percentage_time_spent[key] <= rules[index][2][2]) {
                category_analysis[key] = "Moderate";
            }
            else if (percentage_time_spent[key] > rules[index][2][2]) {
                category_analysis[key] = "Extensive";
            }
        }
    }
    for (let key in category_analysis) {
        if (category_analysis[key] === "Minimal") {
            if (previous_analysis[key] === "Minimal") {
                category_analysis[key] = "Minimal";
            } else if (previous_analysis[key] === "Moderate" || previous_analysis[key] === "Extensive") {
                category_analysis[key] = "Moderate";
            }
        } else if (category_analysis[key] === "Moderate") {
            if (previous_analysis[key] === "Minimal") {
                category_analysis[key] = "Moderate";
            } else if (previous_analysis[key] === "Moderate" || previous_analysis[key] === "Extensive") {
                category_analysis[key] = "Extensive";
            }
        } else if (category_analysis[key] === "Extensive") {
            if (previous_analysis[key] === "Minimal" || previous_analysis[key] === "Moderate") {
                category_analysis[key] = "Extensive";
            }
        }
    }
    return category_analysis;
};




// By age , By Category of Content and By previous analysis generate rule based classifier