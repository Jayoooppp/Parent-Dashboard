import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmail from "./VerifyEmail.js";
import Parent from "../Model/Parent.js";
import Children from "../Model/children.js";
import mongoose from "mongoose";
import Usage from "../Model/Usage.js";
import Activity from "../Model/Activity.js";
import Analysis from "../Model/Analysis.js";
import { BehavioralAnalysis, getPreviousAnalysis } from "../Utils/Functions.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        await Parent.findOne({ email }).then(async (_user) => {
            if (_user) {
                const isPasswordCorrect = await bcrypt.compare(password, _user.password)
                if (isPasswordCorrect) {
                    const token = jwt.sign({ email, id: _user.id }, process.env.SECRET, { expiresIn: '24h' })
                    return res.status(203).json({ user: _user, token })
                } else {
                    return res.status(402).json({ message: "Incorrect Password" })
                }
            } else {
                return res.status(402).json({ message: "User not found" })
            }
        })
    } catch (error) {
        return res.status(403).json(error)
    }
}


export const signUp = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    try {
        // const validate = await verifyEmail(email);
        if (true) {
            await Parent.findOne({ email }).then(async (_user) => {
                if (_user) {
                    return res.status(403).json("User with EmailId already exist")
                } else {
                    const hashedPassword = await bcrypt.hash(password, 12);
                    const newUser = new Parent({ email, firstName, lastName, password: hashedPassword })
                    await newUser.save();
                    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET, { expiresIn: "24h" })
                    return res.status(200).json({ user: newUser, token })
                }
            })
        } else {
            return res.status(403).json({ message: "Please enter a valid email" })
        }
    } catch (error) {
        console.log(error)
        return res.status(403).json(error)
    }
}


export const addChildren = async (req, res) => {

    const data = req.body;

    try {

        let access_token = req.headers['authorization'];
        let access = access_token.split(' ')[1];
        let payload = jwt.verify(access, process.env.SECRET);
        const parent_email = payload.email;
        await Parent.findOne({ email: parent_email }).then(async (_parent) => {
            data["parent"] = _parent._id;
            const newChildren = new Children(data);
            await newChildren.save();
            await Children.findByIdAndUpdate(newChildren._id, { token: newChildren._id }, { new: true })

            let childList = _parent.childrens;
            childList.push(newChildren._id);
            await Parent.findOneAndUpdate({ email: parent_email }, { childrens: childList }, { new: true }).then((__parent) => {
                return res.status(203).json(__parent);
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(403).json(error)
    }

}

export const getChildrens = async (req, res) => {
    try {
        const { userId } = req.params;
        await Children.find({ parent: userId }).then((childs) => {
            return res.status(203).json(childs)
        })
    } catch (error) {
        return res.status(403).json(error)
    }
}

export const getChildren = async (req, res) => {
    try {
        const { childId } = req.params;
        await Children.findById(childId).then((child) => {
            return res.status(203).json(child)
        })

    } catch (error) {
        console.log(error);
        return res.status(403).json(error)

    }
}

export const updateChildren = async (req, res) => {
    try {
        const { childId } = req.params;
        const data = req.body;
        console.log(data)
        await Children.findByIdAndUpdate(childId, data, { new: true }).then((child) => {
            return res.status(203).json(child);
        }
        )
    } catch (error) {
        console.log(error)
    }
}

export const getVisites = async (req, res) => {
    try {
        const { userId } = req.params;

        await mongoose.connect(process.env.MONGO)
        await Parent.findById(userId).then(async (parent) => {
            const response = await Children.aggregate([
                {
                    $match: {
                        parent: parent._id
                    }
                },
                {
                    $lookup: {
                        from: "visits",
                        localField: "_id",
                        foreignField: "childrens",
                        as: "visits"
                    }
                },
                {
                    $match: {
                        visits: { $ne: [] } // Filter out documents with an empty visits array
                    }
                }
            ])
            return res.status(203).json(response)
        })


    } catch (error) {
        console.log(error)
    }
}

// get Usage of the children by date
export const getUsageByChildren = async (req, res) => {
    try {
        const { childId } = req.params;
        const date = new Date(req.params.date).toISOString().slice(0, 10);
        const _date = new Date(date);

        await Usage.findOne({ children: childId, date: _date }).then((usage) => {
            console.log(usage);
            // calculate total usage and percentage for each category usage
            let totalUsage = 0;
            let categoryWiseUsage = usage.categoryWiseUsage;
            categoryWiseUsage.forEach((value) => {
                totalUsage += value;
            }
            )

            // create array of objects for each category with name , usage and percentage

            let categoryWiseUsageArray = [];
            categoryWiseUsage.forEach((value, key) => {
                categoryWiseUsageArray.push({ name: key, usage: value })
            })
            return res.status(203).json({ usage, totalUsage, categoryWiseUsageArray })
        })
    } catch (error) {
        console.log(error)
    }
}


// update the usage by children
export const updateUsageByChildren = async (req, res) => {
    try {
        const { childId } = req.params;
        const date = new Date(req.params.date).toISOString().slice(0, 10);
        const _date = new Date(date);
        const data = req.body;
        await Usage.findOneAndUpdate({ children: childId, date: _date }, data, { new: true }).then((usage) => {
            return res.status(203).json(usage)
        }
        )
    } catch (error) {
        console.log(error)
    }
}



// get Activity of the children by date
export const getActivityByDate = async (req, res) => {
    try {
        const { childId } = req.params;
        const date = new Date(req.params.date).toISOString().slice(0, 10);
        const _date = new Date(date);
        const { page } = req.query;
        const { access } = req.query;
        const { category } = req.query;


        let query = {}
        if (access !== "all") {
            query["access"] = access;
        }
        if (category !== "all") {
            query["category"] = category;
        }
        query["children"] = childId;
        query["date"] = _date;

        const activities = await Activity.find(query).sort({ time: -1 }).skip((page - 1) * 10).limit(10);
        const activityCounts = await Activity.find(query).countDocuments();
        return res.status(203).json({ activities, totalPages: Math.ceil(activityCounts / 10) });

    }
    catch (error) {
        console.log(error)
    }
}


// get last 5 days usage of the children
export const getPreviousUsage = async (req, res) => {
    try {
        // console.log("Here is the request");
        const { childId } = req.params;
        const today = new Date();
        const last5Days = new Date(today.setDate(today.getDate() - 5));
        const usages = [];



        await Usage.find({ children: childId, date: { $gte: last5Days } }).sort({ date: 1 }).then((usage) => {
            // calculate totalUsage for each result
            usage.forEach((value) => {
                let totalUsage = 0;
                let categoryWiseUsage = value.categoryWiseUsage;
                categoryWiseUsage.forEach((value) => {
                    totalUsage += value;
                })
                usages.push({ date: value.date, totalUsage: totalUsage });
            })
            return res.status(203).json(usages)
        })
    } catch (error) {
        return res.status(404).json(error)
        console.log(error)
    }
}




export const peformBehavioralAnalysis = async (req, res) => {
    try {
        const { childId } = req.params;
        let _date = new Date();
        console.log(_date);
        let prev = new Date(_date);
        prev.setDate(prev.getDate() - 1);
        prev = prev.toISOString().slice(0, 10);
        _date = _date.toISOString().slice(0, 10);



        await Analysis.findOne({ children: childId, $expr: { $eq: [prev, { $dateToString: { date: "$date", format: "%Y-%m-%d" } }] } }).sort({ time: -1 }).then(async (analysis) => {
            await Usage.findOne({ children: childId, $expr: { $eq: [prev, { $dateToString: { date: "$date", format: "%Y-%m-%d" } }] } }).sort({ time: -1 }).then(async (currentUsage) => {
                // calculate total usage
                if (!currentUsage) {
                    return res.status(404).json({ message: "No usage found" });
                }
                let totalUsage = 0;
                let categoryWiseUsage = currentUsage.categoryWiseUsage;
                categoryWiseUsage.forEach((value) => {
                    totalUsage += value;
                }
                )
                const children = await Children.findById(childId);

                const result = BehavioralAnalysis(currentUsage.toJSON(), analysis.toJSON(), children, totalUsage);
                // create new document for the analysis result 
                const newAnalysis = new Analysis({ children: childId, date: new Date(), analysis: { ...result } });
                await newAnalysis.save();

                return res.status(203).json(newAnalysis);
            })
        })



    } catch (error) {
        console.log(error)
    }
}

export const getBehavioralAnalysis = async (req, res) => {
    try {
        const { childId } = req.params;
        await Analysis.find({ children: childId }).sort({ date: -1 }).then((analysis) => {
            return res.status(203).json(analysis)
        })
    } catch (error) {
        console.log(error)
    }
};

export const getBehavioralAnalysisById = async (req, res) => {
    try {
        const { analysisId } = req.params;
        await Analysis.findById(analysisId).then((analysis) => {
            return res.status(203).json(analysis)
        })
    } catch (error) {
        console.log(error);
    }
}