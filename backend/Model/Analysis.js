import mongoose from 'mongoose';
const analysisSchema = new mongoose.Schema({
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "children"
    },
    date: Date,
    analysis: {
        type: Map,
        of: String
    }
});

const Analysis = mongoose.model("analysis", analysisSchema);
export default Analysis;    