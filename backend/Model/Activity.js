import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "children"
    },
    date: Date, //fetch time from the data only 
    request: String,
    category: String,
    access: {
        type: String,
        enum: ["Allowed", "Not Allowed", "Partially Allowed"]
    }
});

const Activity = mongoose.model("activity", ActivitySchema);
export default Activity;
