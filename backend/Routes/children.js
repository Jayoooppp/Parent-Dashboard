import express from "express";
import { signIn } from "../Controller/children.js";
const childrenRoutes = express.Router();

childrenRoutes.post("/signIn", signIn);

export default childrenRoutes;