import Airtable from "airtable";

export const initializeAirTable = () => {
  // Initialize Airtable
  Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

  return Airtable.base(process.env.AIRTABLE_BASE_ID as string);
};
