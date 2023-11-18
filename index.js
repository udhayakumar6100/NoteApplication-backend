import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./db.js";
import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send({
    message: "api is working now",
  });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }

  console.log("Server is running on port number", port);
});
