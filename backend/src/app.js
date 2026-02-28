import express from "express";
import mRouter from "./routes/movies.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
})

app.use("/api/movies", mRouter);

app.get("/", (req, res) => res.send("running movies API"));

app.use((req, res) => {
    res.status(404).json({ message: "not found"});
});


export default app;