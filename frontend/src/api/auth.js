import axios from "axios";
const URL = process.env.REACT_APP_URL;

export const signUp = async (data) => {
    return await axios.post(URL + "/parent/signUp", data)
}

export const signIn = async (data) => {
    return await axios.post(URL + "/parent/signIn", data);
}