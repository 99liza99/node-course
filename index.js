import express, { Router } from "express";
import router from "express";
import mongoose from "mongoose";
import Post from "./Post.js";
import Doctor from "./Doctor.js";

const PORT = 5000;
const app = express();
// const DB_URL =
//   "mongodb+srv://user11:user11@cluster0.fk8v0.mongodb.net/?retryWrites=true&w=majority";

app.use(
  express.json()
); /**Таким образом мы передаём   express формат к json и тогда запросы Postman не будут undifind, а будут отображаться в консоль а именно { test: 'test1', username: 'ULBI TV' } те данные что мы ввели в постман*/

app.post("/", async (req, res) => {
  console.log(req.body);
  const { author, title, content } = req.body;
  const newPost = await Post.create({ author, title, content });
  res.status(200).json(newPost);
});

app.post("/add-doctor", async (req, res) => {
  console.log(req.body);
  const { name, description, specialization, age } = req.body;
  const newDoctor = await Doctor.create({
    name,
    description,
    specialization,
    age,
  });
  res.status(200).json(newDoctor);
});

app.get("/get-doctors", async (request, response) => {
  const doctors = await Doctor.find();
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  response.json(doctors);
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT" + PORT));
  } catch (e) {
    console.log(e);
  }
}
startApp();
