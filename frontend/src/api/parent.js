import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_URL })
import { ChildrenInternetUsage } from "data";
import { Childrens } from "data";

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


export const getChildrens = async (userId) => {
    return await API.get(`/parent/getChildrens/${userId}`);
}

export const addChildren = async (data) => {
    return await API.post(`/parent/addChildren`, data);
}

export const getChildren = async (childId, temp = "other") => {
    return await API.get(`/parent/getChildren/${childId}`);

}
export const getUsageByChildren = async (childId, date) => {
    return await API.get(`/parent/getUsageByChildren/${childId}/${date}`);
}

export const updateChildren = async (childId, data) => {
    return await API.post(`/parent/updateChildren/${childId}`, data);
}

export const getVisits = async (userId) => {
    return await API.get(`/parent/getVisits/${userId}`);
}


export const getActivitiesByDate = async (childId, date, category, access, page) => {
    return await API.get(`/parent/getActivitiesByDate/${childId}/${date}?page=${page}&access=${access}&category=${category}`);
}

export const getLast5DaysUsage = async (childId) => {
    return await API.get(`/parent/getLast5DaysUsage/${childId}`);
}

export const getBehavioralAnalysis = async (childId) => {
    return await API.get(`/parent/getBehavioralAnalysis/${childId}`);
}


export const getBehavioralAnalysisById = async (analysisId) => {
    return await API.get(`/parent/getBehavioralAnalysisById/${analysisId}`);
}

export const performBehavioralAnalysis = async (childId) => {
    return await API.get(`/parent/performBehavioralAnalysis/${childId}`);
}
