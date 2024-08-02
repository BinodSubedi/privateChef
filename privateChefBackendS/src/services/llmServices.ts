import {
  Ollama,
  Settings,
  VectorStoreIndex,
  QdrantVectorStore,
  storageContextFromDefaults,
  BaseNodePostprocessor,
  PDFReader,
} from "llamaindex";

import { Filter, Question } from "./../interfaces/index";

Settings.llm = new Ollama({
  model: "gemma2:2b",
});
Settings.embedModel = new Ollama({
  model: "all-minilm",
});

const vectorStore = new QdrantVectorStore({
  url: "http://localhost:6333",
  collectionName: "privatechefdev",
});

class NodeWithScore {
  node: any;
  score: any;
}

//Post-Processing
class PostProcessor implements BaseNodePostprocessor {
  private filter: Filter;
  constructor(filter: Filter) {
    this.filter = filter;
  }

  async postprocessNodes(
    nodes: NodeWithScore[],
    query?: any
  ): Promise<NodeWithScore[]> {
    let filteredNodes = [];

    const keys = Object.keys(this.filter);
    const values = Object.values(this.filter);

    for (const node of nodes) {
      let check = true;

      console.log(nodes);

      keys.map((el, i) => {
        if (values[i] != node.node.metadata[el]) {
          check = false;
        }
      });

      if (check) {
        filteredNodes.push(node);
      }
    }

    return filteredNodes;
  }
}

const path = "./testFiles";

export const indexDocuments = async (filter: Filter) => {
  const reader = new PDFReader();
  const documents = await reader.loadData(path + `/${filter.book}`);

  //pre-processing
  //adding metadata required for filtering
  const keys = Object.keys(filter);
  const values = Object.values(filter);

  documents.forEach((el) => {
    keys.forEach((e, i) => {
      el.metadata[e] = values[i];
    });
  });

  const storageContext = await storageContextFromDefaults({
    vectorStore,
  });

  await VectorStoreIndex.fromDocuments(documents, {
    storageContext,
  });
};

export const askingQuestions = async (filter: Filter, question: Question) => {
  const index = await VectorStoreIndex.fromVectorStore(vectorStore);

  const queryEngine = index.asQueryEngine({
    retriever: index.asRetriever(),
    nodePostprocessors: [new PostProcessor(filter)],
  });

  const response = await queryEngine.query({
    query: `${question.qsn} and make the response short`,
  });

  return response.toString();
};

export const makingSummary = async (filter: Filter) => {
  const index = await VectorStoreIndex.fromVectorStore(vectorStore);

  const queryEngine = index.asQueryEngine({
    retriever: index.asRetriever(),
    nodePostprocessors: [new PostProcessor(filter)],
  });

  const response = await queryEngine.query({
    query:
      "Summarise everything in the text without any sensitive data and make it a response with only the summary and don't mention the prompt",
  });

  return response.toString();
};
