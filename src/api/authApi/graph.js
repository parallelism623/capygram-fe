import { graphInstance, requestWithToken } from "@/utils/axios-http/axios-http";

export const getFollowers = async (Id) => {
  try {
    const response = await requestWithToken(graphInstance, {
      method: "get",
      url: `/api/${Id}/follower`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFollowing = async (Id) => {
  try {
    const response = await requestWithToken(graphInstance, {
      method: "get",
      url: `/api/${Id}/following`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const follow = async (id, did) => {
  try {
    await requestWithToken(graphInstance, {
      method: "post",
      url: `/api/${id}/follow/${did}`
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unFollow = async (id, did) => {
  try {
    await requestWithToken(graphInstance, {
      method: "post",
      url: `/api/${id}/unfollow/${did}`
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCountFollowing = async (Id) => {
  try {
    const response = await requestWithToken(graphInstance, {
      method: "get",
      url: `/api/${Id}/following/count`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCountFollower = async (Id) => {
  try {
    const response = await requestWithToken(graphInstance, {
      method: "get",
      url: `/api/${Id}/follower/count`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

