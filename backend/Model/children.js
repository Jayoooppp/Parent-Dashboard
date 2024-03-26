import mongoose from "mongoose";
import { rules } from "../Utils/Functions.js";
const childrenSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    blockedWebsites: [String],
    hours: Number,
    minutes: Number,
    contentFiltering: [String],
    token: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "parent"
    },
    age: Number,
    gender: String,
    userName: String,
    password: String,
    filteringLevel: {
        type: String,
        enum: ["full", "partial"],
        default: "full"
    },
    rules: {
        type: [[Number]]
    }// Difault rules should be inserted at the time of creation of the child

})

// add default rules based on age of children when new children is added
childrenSchema.pre("save", async function (next) {
    const child = this;

    if (child.age > 2 && child.age <= 5) {
        child.rules = rules[0]
    } else if (child.age > 5 && child.age <= 8) {
        child.rules = rules[1]
    }
    else if (child.age > 8 && child.age <= 12) {
        child.rules = rules[2]
    }
    else if (child.age > 12 && child.age <= 15) {
        child.rules = rules[3]
    }
    else if (child.age > 15 && child.age <= 18) {
        child.rules = rules[4]
    }

    next();
});



const Children = mongoose.model("children", childrenSchema);
export default Children;