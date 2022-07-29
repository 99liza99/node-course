import express, { Router } from "express";
import router from "express";
import mongoose from "mongoose";
import Post from "./Post.js";

const PORT = 5000;
const app = express();
const DB_URL =
  "mongodb+srv://user11:user11@cluster0.fk8v0.mongodb.net/?retryWrites=true&w=majority";

app.use(
  express.json()
); /**Таким образом мы передаём   express формат к json и тогда запросы Postman не будут undifind, а будут отображаться в консоль а именно { test: 'test1', username: 'ULBI TV' } те данные что мы ввели в постман*/

app.post("/", async (req, res) => {
  console.log(req.body);
  const { author, title, content } = req.body;
  const newPost = await Post.create({ author, title, content });
  res.status(200).json(newPost);
});
app.post("/", async (req, res) => {
  const { author, title, content, picture } = req.body;
  const post = await Post.create({ author, title, content, picture });
  res.status(200).json(post);
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
