import express from "express";
import env from "./config";
import checkEmbed from "./sentenceSimilarity";

const app = express();

app.use(express.json());

const port = env.port;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}....`);
});

app.get("/", checkEmbed);
