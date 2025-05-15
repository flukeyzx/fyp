import { ai } from "./configs/gemini.js";

const model = ai.getGenerativeModel({
  model: "text-embedding-004",
});

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  return dotProduct / (magnitudeA * magnitudeB);
};

const query = "I am a MBA graduate with business leads experience.";
const desc = "We are looking for a Frontend software developer.";

const res1 = await model.embedContent(query);
const res2 = await model.embedContent(desc);

console.log(cosineSimilarity(res1.embedding.values, res2.embedding.values));
