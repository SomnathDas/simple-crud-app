import express from "express";
import {
  getPeople,
  createPerson,
  deletePerson,
  updatePerson,
} from "../controllers/people.js";

const peopleRouter = express.Router();

peopleRouter
  .get("/", getPeople)
  .post("/", createPerson)
  .delete("/", deletePerson)
  .put("/", updatePerson);

export default peopleRouter;
