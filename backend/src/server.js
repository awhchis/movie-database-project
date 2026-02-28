import app from "./app.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log("movie API running is successfull");
    console.log(`running backend on http://localhost:${PORT}`);
}).on("error", (err) => {
console.error("server failed to start:", err.message);
});
