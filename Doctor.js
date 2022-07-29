import mongoose from "mongoose";

const Doctor = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  age: { type: Number, required: true }
});

export default mongoose.model('Doctor', Doctor);