import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import parentRoutes from "./Routes/parent.js";
import Usage from "./Model/Usage.js";
import Activity from "./Model/Activity.js";
dotenv.config()


const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())



app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/parent", parentRoutes);

{/**
 "positive",
    "offensive",
    "violent",
    "entertainment",
    "suggestive",
    "educational",
    "health",
    "sexual",
    "games",
    "hate",
    "drugs"
 */}
//  category types for category of activites
// ["Allowed", "Not Allowed", "Partially Allowed"] access types

// change key value nudity in categorywise usage to sexual
// const res = Usage.updateMany({}, { $rename: { "categoryWiseUsage.nudity": "sexual" } });
// console.log(res);


// const res = Activity.insertMany([
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.twitch.tv",
//         "category": "entertainment",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.vice.com",
//         "category": "positive",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.worldstarhiphop.com",
//         "category": "offensive",
//         "access": "Not Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.bestgore.com",
//         "category": "violent",
//         "access": "Partially Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.adultswim.com",
//         "category": "suggestive",
//         "access": "Allowed"
//     }, {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.twitch.tv",
//         "category": "entertainment",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.vice.com",
//         "category": "positive",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.worldstarhiphop.com",
//         "category": "offensive",
//         "access": "Not Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.bestgore.com",
//         "category": "violent",
//         "access": "Partially Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.adultswim.com",
//         "category": "nudity",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.hulu.com",
//         "category": "entertainment",
//         "access": "Partially Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.pbs.org",
//         "category": "positive",
//         "access": "Not Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.buzzfeed.com",
//         "category": "offensive",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.rottentomatoes.com",
//         "category": "violent",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.xvideos.com",
//         "category": "nudity",
//         "access": "Not Allowed"
//     }, {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.instagram.com",
//         "category": "entertainment",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.nationalgeographic.com",
//         "category": "educational",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.reddit.com",
//         "category": "positive",
//         "access": "Not Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.4chan.org",
//         "category": "offensive",
//         "access": "Partially Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.webmd.com",
//         "category": "health",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.epicgames.com",
//         "category": "games",
//         "access": "Partially Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.drugabuse.gov",
//         "category": "drugs",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.theguardian.com",
//         "category": "hate",
//         "access": "Not Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.disney.com",
//         "category": "entertainment",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.wikipedia.org",
//         "category": "educational",
//         "access": "Partially Allowed"
//     }, {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.netflix.com",
//         "category": "entertainment",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492b",
//         "date": "2024-03-27",
//         "request": "https://www.nationalgeographic.com",
//         "category": "educational",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492c",
//         "date": "2024-03-27",
//         "request": "https://www.reddit.com",
//         "category": "positive",
//         "access": "Not Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492c",
//         "date": "2024-03-27",
//         "request": "https://www.4chan.org",
//         "category": "offensive",
//         "access": "Partially Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492d",
//         "date": "2024-03-27",
//         "request": "https://www.webmd.com",
//         "category": "health",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492d",
//         "date": "2024-03-27",
//         "request": "https://www.epicgames.com",
//         "category": "games",
//         "access": "Partially Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492e",
//         "date": "2024-03-27",
//         "request": "https://www.drugabuse.gov",
//         "category": "drugs",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492e",
//         "date": "2024-03-27",
//         "request": "https://www.theguardian.com",
//         "category": "hate",
//         "access": "Not Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492f",
//         "date": "2024-03-27",
//         "request": "https://www.disney.com",
//         "category": "entertainment",
//         "access": "Allowed"
//     },
//     {
//         "children": "6431ee0ebe68b0a77c77492f",
//         "date": "2024-03-27",
//         "request": "https://www.wikipedia.org",
//         "category": "educational",
//         "access": "Partially Allowed"
//     }
// ]);
// console.log(res);


// const res = Usage.insertMany([
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-20",
//         categoryWiseUsage: {
//             "positive": 10,
//             "offensive": 20,
//             "violent": 30,
//             "entertainment": 40,
//             "suggestive": 50,
//             "educational": 60,
//             "health": 70,
//             "nudity": 18,
//             "games": 90,
//             "hate": 100,
//             "drugs": 110
//         }
//     },
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-21",
//         categoryWiseUsage:
//         {
//             "positive": 15,
//             "offensive": 25,
//             "violent": 35,
//             "entertainment": 45,
//             "suggestive": 15,
//             "educational": 65,
//             "health": 75,
//             "nudity": 5,
//             "games": 95,
//             "hate": 105,
//             "drugs": 115
//         }
//     },
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-22",
//         categoryWiseUsage: {
//             "positive": 20,
//             "offensive": 30,
//             "violent": 40,
//             "entertainment": 50,
//             "suggestive": 34,
//             "educational": 70,
//             "health": 80,
//             "nudity": 9,
//             "games": 100,
//             "hate": 10,
//             "drugs": 20
//         }
//     },
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-23",
//         categoryWiseUsage: {
//             "positive": 25,
//             "offensive": 35,
//             "violent": 45,
//             "entertainment": 55,
//             "suggestive": 65,
//             "educational": 75,
//             "health": 85,
//             "nudity": 25,
//             "games": 15,
//             "hate": 15,
//             "drugs": 25
//         }
//     },
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-24",
//         categoryWiseUsage: {
//             "positive": 30,
//             "offensive": 40,
//             "violent": 50,
//             "entertainment": 60,
//             "suggestive": 70,
//             "educational": 80,
//             "health": 90,
//             "nudity": 30,
//             "games": 20,
//             "hate": 20,
//             "drugs": 30
//         }
//     },
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-25",
//         categoryWiseUsage: {
//             "positive": 35,
//             "offensive": 45,
//             "violent": 55,
//             "entertainment": 65,
//             "suggestive": 75,
//             "educational": 85,
//             "health": 95,
//             "nudity": 35,
//             "games": 25,
//             "hate": 25,
//             "drugs": 35
//         }
//     },
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-27",
//         categoryWiseUsage: {
//             "positive": 40,
//             "offensive": 50,
//             "violent": 60,
//             "entertainment": 70,
//             "suggestive": 80,
//             "educational": 90,
//             "health": 100,
//             "nudity": 40,
//             "games": 30,
//             "hate": 30,
//             "drugs": 40
//         }
//     },
//     {
//         children: "6431ee0ebe68b0a77c77492b",
//         date: "2024-03-27",
//         categoryWiseUsage: {
//             "positive": 45,
//             "offensive": 35,
//             "violent": 29,
//             "entertainment": 75,
//             "suggestive": 23,
//             "educational": 95,
//             "health": 105,
//             "nudity": 15,
//             "games": 35,
//             "hate": 25,
//             "drugs": 35
//         }
//     },

// ])

// console.log(res);
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO)
    .then(() => {
        app.listen(PORT, function () {
            console.log("Server started at ", PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

