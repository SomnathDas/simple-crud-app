import express from "express";
import peopleRouter from "./routes/people.js";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/people", peopleRouter);

app.listen(5001, () => {
  console.log("Server is listening on port 5000...");
});
