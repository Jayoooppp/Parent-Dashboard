// children Login
import Children from "../Model/children.js";
import jwt from "jsonwebtoken";
export const signIn = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(403).json({ message: "Provide valid children details" });
    }
    try {
        await Children.findOne({ userName }).then(async (_user) => {
            if (_user) {
                if (password == _user.password) {
                    const token = jwt.sign({ userName, id: _user.id }, process.env.SECRET, { expiresIn: '24h' })
                    return res.status(203).json({ user: _user, token })
                } else {
                    return res.status(402).json({ message: "Incorrect Password" })
                }
            } else {
                return res.status(402).json({ message: "User not found" })
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(403).json(error)
    }
}