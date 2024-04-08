import express from "express";
import { addChildren, getActivityByDate, getBehavioralAnalysis, getBehavioralAnalysisById, getChildren, getChildrens, getPreviousUsage, getUsageByChildren, getVisites, peformBehavioralAnalysis, signIn, signUp, updateChildren } from "../Controller/parent.js";
import auth from "../Middleware/auth.js";
const parentRoutes = express.Router();


parentRoutes.post("/signUp", signUp);
parentRoutes.post("/signIn", signIn);
parentRoutes.post("/addChildren", auth, addChildren);
parentRoutes.get("/getChildrens/:userId", auth, getChildrens)
parentRoutes.get("/getChildren/:childId", auth, getChildren)
parentRoutes.post("/updateChildren/:childId", auth, updateChildren)
parentRoutes.get("/getVisits/:userId", auth, getVisites)
parentRoutes.get("/getUsageByChildren/:childId/:date", auth, getUsageByChildren);
parentRoutes.get("/getActivitiesByDate/:childId/:date", auth, getActivityByDate);
parentRoutes.get("/getLast5DaysUsage/:childId", auth, getPreviousUsage);
parentRoutes.get("/performBehavioralAnalysis/:childId", auth, peformBehavioralAnalysis);
parentRoutes.get("/getBehavioralAnalysis/:childId", auth, getBehavioralAnalysis);
parentRoutes.get("/getBehavioralAnalysisById/:analysisId", auth, getBehavioralAnalysisById);
export default parentRoutes;
