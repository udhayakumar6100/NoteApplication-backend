import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
const { verify } = jsonwebtoken;
dotenv.config();
function authenticator(req, res, next) {
  const token = req.headers.authorization;
  verify(token, process.env.secret_key, (err, decode) => {
    if (err)
      return res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }
  });
}

export default authenticator;
