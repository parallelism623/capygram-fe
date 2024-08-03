import { newsFeedInstance, requestWithToken } from "@/utils/axios-http/axios-http";

export const newsFeed = async (id, limit) => {
  try {
    const response = await requestWithToken(newsFeedInstance, {
      method: "get",
      url: `/api/Newsfeeds/GetNewsfeed/${id}&limit=${limit}`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
}