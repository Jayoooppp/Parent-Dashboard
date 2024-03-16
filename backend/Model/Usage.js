import mongoose from "mongoose";


// Daily totalUsage & Cateogry Wise Usage
const usageSchema = new mongoose.Schema({
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "children"
    },
    date: Date,
    totalUsage: Number,
    categoryWiseUsage: {
        type: Map,
        of: Number
    }
});

const Usage = mongoose.model("usage", usageSchema);
export default Usage;