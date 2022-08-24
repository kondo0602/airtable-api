import Airtable from "airtable";

export const initializeAirTable = () => {
  // Initialize Airtable
  Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

  return Airtable.base("appIAtTzzEM5Yf1Mp");
};
