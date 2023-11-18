import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("note", noteSchema);
