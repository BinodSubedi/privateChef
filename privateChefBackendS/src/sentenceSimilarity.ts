import { Request, Response } from "express";
import {
  Ollama,
  Settings,
  VectorStoreIndex,
  SimpleDirectoryReader,
} from "llamaindex";

Settings.llm = new Ollama({
  model: "llama3",
});
Settings.embedModel = new Ollama({
  model: "all-minilm",
});

const path =
  "C:/Users/Binod Subedi/OneDrive/Documents/PrivateChefAll/privateChefBackendS/testFile";

const checkEmbed = async (req: Request, res: Response) => {
  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData(path);

  const index = await VectorStoreIndex.fromDocuments(documents);

  const queryEngine = index.asQueryEngine({
    retriever: index.asRetriever(),
  });

  const response = await queryEngine.query({
    query: "what is pipelining?",
  });

  const out = response.toString();

  console.log(out);

  res.status(200).json({
    message: out,
  });
};

export default checkEmbed;
