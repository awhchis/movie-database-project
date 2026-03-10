import express from "express";
import { movies } from "../data/movies.data.js";
import { normalize } from "../utils/normalize.js";

function parseMovieId(value) {    
const parsed = Number(value);
return Number.isNaN(parsed) ? null : parsed;
}


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
            message: "Provide at least one of the following: q, title, directot, or actor.",
            
        });      
    }
const results = movies.filter((m) => {
    const movieTitle = normalize(m.title);
    const movieDirector = normalize(m.director);
    const movieCastJoined = normalize(m.cast.join(" "));

    const matchesQ = 
   !filters.q ||
   movieTitle.includes(filters.q) ||
   movieDirector.includes(filters.q) ||
   movieCastJoined.includes(filters.q);


    const matchesTitle = !filters.title || movieTitle.includes(filters.title);
    const matchesActor = !filters.actor || movieCastJoined.includes(filters.actor);
    const matchesDirector = !filters.director || movieDirector.includes(filters.director);

    return matchesQ && matchesTitle && matchesActor && matchesDirector;
});
const searchresults = results.map((m) => ({
    id: m.id,
    title: m.title,
    releaseYear: m.releaseYear,
    director: m.director,

}));

return res.json({
    count: searchresults.length,
    results: searchresults,
});
});

router.get("/:id/credits", (req, res) => {
    const movieId = parseMovieId(req.params.id);

    if (movieId == null) {
        return res.status(400).json({ message: "id must be a number"});
    }

    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
        return res.status(404).json({ message: "movie not found." });
    }

    return res.json({
        id: movie.id,
        title: movie.title,
        Countcrew: movie.crew?.length ?? 0,
        Countcast: movie.cast.length ?? 0,
        cast: movie.cast ?? [],
        crew: movie.crew ?? [],
    });
});

router.get("/:id", (req, res) => {
const paramId = parseMovieId(req.params.id);

if (paramId === null) {
    return res.status(400).json({ message: "Movie id should be a number." });
}


const movie = movies.find((ItemMovie) => 
    ItemMovie.id === paramId);

if (!movie) {
    return res.status(404).json({ message: "Movie not found." });
}

return res.json({
    id: movie.id,
    title: movie.title,
    releaseYear: movie.releaseYear,
    genres: movie.genres,
    director: movie.director,
    revenue: movie.revenue,
    overview: movie.overview,
});
});


export default router;
