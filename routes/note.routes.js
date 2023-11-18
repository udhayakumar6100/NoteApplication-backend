import { Router } from "express";
import dotenv from "dotenv";
import authenticator from "../middlewares/authenticator.js";
import Note from "../models/NoteModel.js";
import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
const noteRouter = Router();
noteRouter.use(authenticator);
dotenv.config();

noteRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;
  verify(token, process.env.secret_key, async (err, decode) => {
    try {
      let data = await Note.find({ user: decode.userId });
      res.send({
        data: data,
        message: "Success",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

noteRouter.post("/create", async (req, res) => {
  try {
    let note = new Note(req.body);
    await note.save();
    res.send({
      message: "Note created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

noteRouter.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await Note.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "Note updated",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

noteRouter.delete("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await Note.findByIdAndDelete({ _id: id });
    res.send({
      message: "Note deleted",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

export default noteRouter;
