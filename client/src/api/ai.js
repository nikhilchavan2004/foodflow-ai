import apiClient from "./client";

export const aiService = {
  search: (query) =>
    apiClient.post("/ai/search", {
      query,
    }),
};