import express from "express";
import { movies } from "../data/movies.data.js";
import { normalize } from "../utils/normalize.js";

const router = express.Router();

router.get("/search", (req, res) => {
    const { q, title, actor, director } = req.query;

    const filters = {
    q: normalize(q),
    title: normalize(title),
    actor: normalize(actor),
    director: normalize(director),
    };

    const noFilters = Object.values(filters).every((v) => v === "");
    if (noFilters) {
        return res.status(400).json({
            message:
            "Provide at least one of the following: q, title, directot, or actor.",
            
        });      
    }
const results = movies.filter((m) => {
    const mTitle = normalize(m.title);
    const mDirector = normalize(m.director);
    const mCastJoined = normalize(m.cast.join(" "));

    const matchesQ = 
   !filters.q ||
   mTitle.includes(filters.q) ||
   mDirector.includes(filters.q) ||
   mCastJoined.includes(filters.q);


    const matchesTitle = !filters.title || mTitle.includes(filters.title);
    const matchesActor = !filters.actor || mCastJoined.includes(filters.actor);
    const matchesDirector = !filters.director || mDirector.includes(filters.director);

    return matchesQ && matchesTitle && matchesActor && matchesDirector;
});
const searchresults = results.map((m) => ({
    id: m.id,
    title: m.title,
    releaseYear: m.releaseYear,
    director: m.director,

}));

return res.json({
    count: results.length,
    results: searchresults,
});
});


export default router;
