import { Router } from "express";
import User from "../models/UserModel.js";
import { hash as _hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
const { sign } = jsonwebtoken;
dotenv.config();
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("All the user");
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  _hash(password, 5, async function (err, hash) {
    if (err) return res.send({ message: "somthing went wrong", status: 0 });
    try {
      let user = new User({ name, email, password: hash });
      await user.save();
      res.send({
        message: "User created",
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

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn: "1h",
  };

  try {
    let data = await User.find({ email });
    if (data.length > 0) {
      let token = sign({ userId: data[0]._id }, process.env.secret_key, option);
      console.log(token);
      compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({ message: "Somthing went wrong:" + err, status: 0 });
        if (result) {
          res.send({
            message: "User logged in successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

export default userRouter;
