import use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from "@tensorflow/tfjs";

const user = {
  name: "John Doe",
  skills: ["React", "Node.js", "MongoDB"],
  experience: "2 years of full-stack development experience.",
  education: "Bachelor's in Computer Science.",
  resumeContent: "I have worked at XYZ Company as a full stack developer...",
};

const job1 = {
  title:
    "We are looking for a Graphics designer with experience in UI/UX Design.",
  experience:
    "2 year experience in the Working with figma, adobe xd and UI/UX.",
  education: "Bachelor's in IT",
  skills: ["Figma", "UI/UX", "HTML", "CSS"],
};

const job2 = {
  title:
    "We are looking for a Full stack develper with a 1-2 year experience in React and Node js.",
  experience: "2 year experience in the React and Node js stack.",
  education: "Bachelor's in IT/DS/CS",
  skills: ["React", "Node", "Express", "MongoDB"],
};

export const generateUserProfileText = (user) => {
  const text = [];

  if (user.name) text.push(`Name: ${user.name}`);
  if (user.skills?.length > 0)
    text.push(`Skills: ${user.skills.join(", ")} [Hight Priority]`);
  if (user.experience)
    text.push(`Experience: ${user.experience} [High Priority]`);
  if (user.resumeContent)
    text.push(`Resume Content: ${user.resumeContent} [High Priority]`);
  if (user.education) text.push(`Education: ${user.education}`);
  if (user.rate) text.push(`Pay Rate: ${user.rate}`);
  if (user.timing) text.push(`Timing : ${user.timing}`);
  return text.join(". ");
};

export const generateJobDescriptionText = (job) => {
  const text = [];

  if (job.title) text.push(`Title: ${job.title} [High Priority]`);
  if (job.description)
    text.push(`Description: ${job.description} [High Priority]`);
  if (job.experience)
    text.push(`Experience: ${job.experience} [High Priority]`);
  if (job.skills)
    text.push(`Required Skills: ${job.skills.join(", ")} [High Priority]`);
  if (job.education) text.push(`Education: ${job.education}`);
  if (job.pay) text.push(`Salary/Pay: ${job.pay}`);
  if (job.timing) text.push(`Timings : ${timings}`);
  if (job.type) text.push(`Type: ${job.type}`);
  if (job.role) text.push(`Role: ${job.role}`);

  return text.join(". ");
};

export const generateEmbeddings = async (data) => {
  const model = await use.load();
  const embeddings = await model.embed([data]);
  const result = await embeddings.array();
  return result[0];
};

export const cosineSimilarity = (a, b) => {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val ** 2, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

const userText = generateUserProfileText(user);
const job1Text = generateJobDescriptionText(job1);
const job2Text = generateJobDescriptionText(job2);

const userEmbedding = await generateEmbeddings(userText);
const job1Embedding = await generateEmbeddings(job1Text);
console.log("User and job1 embedding created successfully");
console.log(
  `user embedding: ${userEmbedding}, job1 embedding: ${job1Embedding}`
);
const job2Embedding = await generateEmbeddings(job2Text);

console.log(
  `Relevence score of 1st job ${cosineSimilarity(userEmbedding, job1Embedding)}`
);
console.log(
  `Relevence score of 2st job ${cosineSimilarity(userEmbedding, job2Embedding)}`
);
