import pdfParse from "pdf-parse";

export const parsePDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);

    return data.text;
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

export const fetchFileFromCloudinary = async (resumeUrl) => {
  const res = await fetch(resumeUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch file from Cloudinary.");
  }

  return Buffer.from(await res.arrayBuffer());
};
