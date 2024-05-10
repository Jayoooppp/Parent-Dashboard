import Analysis from "../Model/Analysis.js"

// get previsious behavioral analysis of children 
// While Fetching previous analysis we need make sure that we are fetching yesterdays behavioral analysis
export const getPreviousAnalysis = async (childId, date) => {
    const _date = new Date(date.toISOString().slice(0, 10));
    try {
        // await Analysis.findOne({ children: childId }).sort({ time: -1 }).then((analysis) => {
        //     return analysis;
        // })
        await Analysis.find().then((analysis) => {
            console.log(analysis)
            return analysis;
        }).catch((error) => {
            console.log(error)
            return ({ message: "No Data Found" });
        })
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
    "Explicit sexual": 80,
    "Games": 190,
    "Drugs & Alcohol": 100,
    "total_time": 2180
};

const type = {
    "Good": ["positive", "educational", "health"],
    "Entertainment": ["entertainment", "games"],
    "Inappropriate": ["offensive", "violent", "suggestive", "sexual", "drugs"],
}



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
    "drugs",
]

// const previous_analysis = {
//     "positive": "Moderate",
//     "offensive": "None",
//     "violent": "Extensive",
//     "entertainment": "Minimal",
//     "suggestive": "Moderate",
//     "educational": "Minimal",
//     "health": "Moderate",
//     "sexual": "None",
//     "games": "Moderate",
//     "hate": "None",
//     "drugs": "Extensive"
// };




// age 2 - 5 as 0
// age 5 - 8 as 1
// age 8 - 12 as 2
// age 12 - 15 as 3
// age 15 - 100 as 4

// Inappropriate as 0
// Entertainment as 1
// Good as 2


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

export const BehavioralAnalysis = (currentUsage, previous_analysis, children, totalUsage) => {
    let percentage_time_spent = {};
    for (const key in currentUsage.categoryWiseUsage) {
        console.log(key);
        percentage_time_spent[key] = (currentUsage.categoryWiseUsage[key] / totalUsage) * 100;
    }




    let age = children.age;
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

    let childRules;
    if (children.customRules) {
        childRules = children.rules;
    } else {
        childRules = rules[index];
    }

    for (let key in percentage_time_spent) {
        if (type.Inappropriate.includes(key)) {
            if (percentage_time_spent[key] > childRules[0][0] && percentage_time_spent[key] <= childRules[0][1]) {
                category_analysis[key] = "Minimal";
            } else if (percentage_time_spent[key] > childRules[0][1] && percentage_time_spent[key] <= childRules[0][2]) {
                category_analysis[key] = "Moderate";
            } else if (percentage_time_spent[key] > childRules[0][2]) {
                category_analysis[key] = "Extensive";
            }
        } else if (type.Entertainment.includes(key)) {
            if (percentage_time_spent[key] > childRules[1][0] && percentage_time_spent[key] <= childRules[1][1]) {
                category_analysis[key] = "Minimal";
            } else if (percentage_time_spent[key] > childRules[1][1] && percentage_time_spent[key] <= childRules[1][2]) {
                category_analysis[key] = "Moderate";
            } else if (percentage_time_spent[key] > childRules[1][2]) {
                category_analysis[key] = "Extensive";
            }
        } else {
            if (percentage_time_spent[key] > childRules[2][0] && percentage_time_spent[key] <= childRules[2][1]) {
                category_analysis[key] = "Minimal";
            } else if (percentage_time_spent[key] > childRules[2][1] && percentage_time_spent[key] <= childRules[2][2]) {
                category_analysis[key] = "Moderate";
            }
            else if (percentage_time_spent[key] > childRules[2][2]) {
                category_analysis[key] = "Extensive";
            }
        }
    }
    if (previous_analysis) {
        for (let key in category_analysis) {
            if (category_analysis[key] === "Minimal") {
                if (previous_analysis.analysis[key] === "Minimal") {
                    category_analysis[key] = "Minimal";
                } else if (previous_analysis.analysis[key] === "Moderate" || previous_analysis.analysis[key] === "Extensive") {
                    category_analysis[key] = "Moderate";
                }
            } else if (category_analysis[key] === "Moderate") {
                if (previous_analysis.analysis[key] === "Minimal") {
                    category_analysis[key] = "Moderate";
                } else if (previous_analysis.analysis[key] === "Moderate" || previous_analysis.analysis[key] === "Extensive") {
                    category_analysis[key] = "Extensive";
                }
            } else if (category_analysis[key] === "Extensive") {
                if (previous_analysis.analysis[key] === "Minimal" || previous_analysis.analysis[key] === "Moderate") {
                    category_analysis[key] = "Extensive";
                }
            }
        }
    }
    console.log(category_analysis);
    return category_analysis;
};




// By age , By Category of Content and By previous analysis generate rule based classifier