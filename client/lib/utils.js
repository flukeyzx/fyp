import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function parseSkills(skills) {
  const fixedJSON = skills.replace(/'/g, '"');
  let parsedSkills = [];

  try {
    parsedSkills = JSON.parse(fixedJSON);
    return parsedSkills;
  } catch (e) {
    console.log("Invalid json format.", e);
    throw e;
  }
}

export function parseDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
}

export function getCookie(name) {
  console.log(document.cookie);
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  console.log(value, parts);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
}
