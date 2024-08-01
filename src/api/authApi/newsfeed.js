import { newsFeedInstance, requestWithToken } from "@/utils/axios-http/axios-http";

export const newsFeed = async (id) => {
  try {
    const response = await requestWithToken(newsFeedInstance, {
      method: "get",
      url: `/api/Newsfeeds/GetNewsfeed/${id}`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
}