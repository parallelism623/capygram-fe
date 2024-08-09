import { chatInstance, requestWithToken } from "@/utils/axios-http/axios-http";

export const getMessages = async (chatId) => {
  try {
    const response = await requestWithToken(chatInstance, {
      method: "get",
      url: `/api/Chat/messages/${chatId}`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
}