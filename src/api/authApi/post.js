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
    const { imageUrls, likes, content, id } = post;
    const { userName, userId } = user;

    await requestWithToken(postInstance, {
      data: {
        id,
        imageUrls,
        likes,
        content,
        userName,
        userId
      },
      method: "put",
      url: "/api/Posts/Update"
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPosts = async (page, limit) => {
  try {
    const response = await requestWithToken(postInstance, {
      method: "get",
      url: `/api/Posts/GetAll?pageSize=${limit}&pageNumber=${page}`
    });
    return response.data.value;
  } catch (error) {
    console.log(error);
    throw error;
  }
};