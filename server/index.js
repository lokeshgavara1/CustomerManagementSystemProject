// index.js

import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import customerRoute from "./routes/customer.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7700;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get('/',
    (req, res) => { res.send('Hello from Express!') });

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(helmet());


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/customers", customerRoute);

app.listen(PORT, () => {
    console.log("Listening on port 7700");
    connect();
});