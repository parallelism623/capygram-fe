import { postInstance, requestWithToken } from "@/utils/axios-http/axios-http";

export const createPost = async (post, user) => {
  try {
    const formData = new FormData();
    const { ImageUrls, Likes, Content } = post;
    const { UserName, UserId } = user;
    ImageUrls.forEach((image) => {
      new File([], image)
      formData.append('ImageUrls', image);
    });
    formData.append('Likes', Likes);
    formData.append('Content', Content);
    formData.append('UserName', UserName);
    formData.append('UserId', UserId);

    await requestWithToken(postInstance, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: "post",
      url: "/api/Posts/Create"
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getPostByUserId = async (userId) => {
  try {
    const response = await requestWithToken(postInstance, {
      method: "get",
      url: `/api/Posts/GetPostsByUserID?UserId=${userId}`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deletePostByPostId = async (postId) => {
  try {
    await requestWithToken(postInstance, {
      method: "delete",
      url: `/api/Posts/Delete/${postId}`
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updatePost = async (post, user) => {
  try {
    const formData = new FormData();
    const { ImageUrls, Likes, Content, Id } = post;
    const { UserName, UserId } = user;
    formData.append('Id', Id);
    ImageUrls.forEach((image) => {
      formData.append('ImageUrls', image);
    });
    formData.append('Likes', Likes);
    formData.append('Content', Content);
    formData.append('UserName', UserName);
    formData.append('UserId', UserId);

    await requestWithToken(postInstance, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: "put",
      url: `/api/Posts/Update/${Id}`
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await requestWithToken(postInstance, {
      method: "get",
      url: "/api/Posts/GetAll"
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
};