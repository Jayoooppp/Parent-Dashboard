import Analysis from "../Model/Analysis.js"

// get previsious behavioral analysis of children 
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