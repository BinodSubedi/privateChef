import { Request, Response } from "express";
import {
  Ollama,
  Settings,
  VectorStoreIndex,
  SimpleDirectoryReader,
  QdrantVectorStore,
  storageContextFromDefaults,
} from "llamaindex";

Settings.llm = new Ollama({
  model: "gemma:2b",
});
Settings.embedModel = new Ollama({
  model: "all-minilm",
});

const vectorStore = new QdrantVectorStore({
  url: "http://localhost:6333",
  collectionName: "privatechefdev",
});

// VectorStoreIndex.fromVectorStore(vectorStore);

const path = "./testFiles";

const checkEmbed = async (req: Request, res: Response) => {
  const reader = new SimpleDirectoryReader();
  ///////
  const documents = await reader.loadData(path);
  const storageContext = await storageContextFromDefaults({
    vectorStore,
  });
  const index = await VectorStoreIndex.fromDocuments(documents, {
    storageContext,
  });

  // const index = await VectorStoreIndex.fromVectorStore(vectorStore);

  // const index = await VectorStoreIndex.fromDocuments(documents);

  const queryEngine = index.asQueryEngine({
    retriever: index.asRetriever(),
  });

  const response = await queryEngine.query({
    query: "what is RISC-V ISA?",
  });

  const out = response.toString();

  console.log(out);

  res.status(200).json({
    message: out,
  });
};

export default checkEmbed;
