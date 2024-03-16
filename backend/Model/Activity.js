import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "children"
    },
    date: Date,
    request: String,
    category: String,
    access: {
        type: String,
        enum: ["Allowed", "Not Allowed"]
    }
});

const Activity = mongoose.model("activity", ActivitySchema);
export default Activity;
