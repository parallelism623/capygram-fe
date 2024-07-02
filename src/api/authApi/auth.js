import { request, requestWithToken } from "@/utils/axios-http/axios-http";

export const register = async (data) => {
  try {
    const { fullname, email, username, password, month, day, year, otp, avatarUrl } = data;
    const date = new Date(year, month - 1, day);
    const birthday = date.toISOString();

    await request({
      data: {
        fullName: fullname,
        email,
        userName: username,
        password,
        birthday: birthday,
        otp,
        avatarUrl,
      },
      method: "post",
      url: "/api/Users/register"
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const active_account = async (data) => {
  try {
    const { fullname, email, username, password, month, day, year, otp, avatarUrl } = data;
    const date = new Date(year, month - 1, day);
    const birthday = date.toISOString();

    //gọi API và chờ phản hồi
    const response = await request({
      data: {
        fullName: fullname,
        email,
        userName: username,
        password,
        birthday: birthday,
        otp,
        avatarUrl,
      },
      method: "post",
      url: "/api/Users/active-account"
    });

    //lấy refreshToken và accessToken từ phản hồi
    const { refreshToken, accessToken } = response.value;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const login = async (data) => {
  try {
    const { username, password } = data;

    //gọi API và chờ phản hồi
    const response = await request({
      data: {
        userName: username,
        password,
      },
      method: "post",
      url: "/api/Users/login"
    });

    //lấy refreshToken và accessToken từ phản hồi
    const { refreshToken, accessToken, id } = response.data.value;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);

    //có getMe sẽ lưu vào redux user
    localStorage.setItem("userId", id);
    //getMe();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const getMe =

export const logout = async () => {
  try {
    const userId = localStorage.getItem("userId");

    await requestWithToken({
      method: "post",
      url: `/api/Users/logout?Id=${userId}`
    });

    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const editProfile = async (data) => {
  try {
    const { avata, bio, sex } = data;
    //se thay doi cach lay id sau
    const id = localStorage.getItem("userId");

    let gender;
    if (sex === 'male') {
      gender = 1;
    }
    else if (sex === 'female') {
      gender = 2;
    } else {
      gender = 0;
    }

    await requestWithToken({
      data: {
        id,
        avatarUrl: avata,
        story: bio,
        gender ,
      },
      method: "post",
      url: "/api/Users/edit"
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
};