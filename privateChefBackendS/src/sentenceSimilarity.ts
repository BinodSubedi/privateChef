import { Request, Response } from "express";
import {
  Ollama,
  Settings,
  VectorStoreIndex,
  SimpleDirectoryReader,
  QdrantVectorStore,
  storageContextFromDefaults,
  BaseNodePostprocessor,
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

class NodeWithScore {}

//Post-Processing
class PostProcessor implements BaseNodePostprocessor {
  async postprocessNodes(
    nodes: NodeWithScore[],
    query?: any
  ): Promise<NodeWithScore[]> {
    for (const node of nodes) {
      console.log("Node::", node);
    }

    return nodes;
  }
}

// VectorStoreIndex.fromVectorStore(vectorStore);

const path = "./testFiles";

const checkEmbed = async (req: Request, res: Response) => {
  const reader = new SimpleDirectoryReader();
  ///////
  const documents = await reader.loadData(path);

  //pre-processing
  //adding metadata required for filtering
  documents.forEach((el) => {
    el.metadata.user = "user";
  });

  const storageContext = await storageContextFromDefaults({
    vectorStore,
  });
  const index = await VectorStoreIndex.fromDocuments(documents, {
    storageContext,
  });

  //summaryIndex

  // const index = await VectorStoreIndex.fromVectorStore(vectorStore);

  // const index = await VectorStoreIndex.fromDocuments(documents);

  const queryEngine = index.asQueryEngine({
    retriever: index.asRetriever(),
    nodePostprocessors: [new PostProcessor()],
  });

  const response = await queryEngine.query({
    query:
      "Summarise everything in the text without any sensitive data and make it a response with only the summary and don't mention the prompt",
  });

  const out = response.toString();

  console.log(out);

  res.status(200).json({
    message: out,
  });
};

export default checkEmbed;
