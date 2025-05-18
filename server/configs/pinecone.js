import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "dotenv";

config({
  path: "./.env",
});

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = "jobs-index";
const dimension = 512;

export const createPineconeIndex = async () => {
  try {
    const existingIndexes = await pinecone.listIndexes();

    const indexExists = existingIndexes.indexes.some(
      (index) => index.name === indexName
    );

    if (indexExists) {
      console.log(`Connected to existing index ${indexName}`);
      return;
    }

    await pinecone.createIndex({
      name: indexName,
      dimension: dimension,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });

    console.log(`Connected to newly created index ${indexName}`);
  } catch (error) {
    console.log(`Error creating pinecone index ${error}`);
    process.exit(1);
  }
};
