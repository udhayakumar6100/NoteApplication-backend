import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connection = connect(process.env.CONNECTION_URL);

export default {
  connection,
};
