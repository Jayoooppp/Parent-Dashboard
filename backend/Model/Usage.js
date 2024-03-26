import mongoose from "mongoose";


// Daily totalUsage & Cateogry Wise Usage
const usageSchema = new mongoose.Schema({
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "children"
    },
    date: Date,
    // totalUsage: Number,
    categoryWiseUsage: {
        type: Map,
        of: Number,
        default: {
            "positive": 0,
            "offensive": 0,
            "violent": 0,
            "entertainment": 0,
            "suggestive": 0,
            "educational": 0,
            "health": 0,
            "sexual": 0,
            "games": 0,
            "drugs": 0,
        }
    } //In Minutes
});

const Usage = mongoose.model("usage", usageSchema);
export default Usage;