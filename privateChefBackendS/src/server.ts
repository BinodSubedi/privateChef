import express from "express";
import env from "./config";
import checkEmbed from "./sentenceSimilarity";
import router from "./routes";

const app = express();

app.use(express.json());

app.use("/api", router);

const port = env.port;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}....`);
});

// app.get("/", checkEmbed);
