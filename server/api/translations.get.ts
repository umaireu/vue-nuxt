import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const directusUrl = config.public.directusUrl;

  const query = getQuery(event);

  try {
    const response = await $fetch(directusUrl, {
      params: query,
    });
    return response;
  } catch (error) {
    console.error("Error fetching from Directus:", error);
    throw error;
  }
});
