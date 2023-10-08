import express, { Application, Request, Response, request } from "express";
import { z, ZodError } from "zod";
import { envVariable } from "./utils/envVariables";
const cors = require("cors");
const movies = require("./data/data.json");

const app: Application = express();
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json("Welcome");
});

app.get("/getmovies", (req: Request, res: Response) => {
  return res.status(200).json(movies);
});

app.get("/getmovie/:id", (req: Request, res: Response) => {
  const movieSelectedSchema = z
    .string()
    .refine((value) => value === "0" || value === "1" || value === "2", {
      message: "choix non valide non valide",
    });

  try {
    const movieId = Number(movieSelectedSchema.parse(req.params.id));
    const movie = movies[movieId];
    // const movie = movies.find((movie) => movie.id === movieId);
    return res.status(200).json(movie);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(404).json("error from zod validation");
    } else {
      return res.status(400).json("error");
    }
  }
});

app.all("*", (req: Request, res: Response) => {
  return res.status(404).json("Page not found");
});

const PORT = envVariable.PORT;
app.listen(PORT, () => {
  console.log(
    `server has started on PORT ${PORT} within mode ${envVariable.NODE_ENV}`
  );
});
