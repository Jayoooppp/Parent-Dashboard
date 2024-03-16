import mongoose from "mongoose";
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
    gender: String

})

const Children = mongoose.model("children", childrenSchema);
export default Children;