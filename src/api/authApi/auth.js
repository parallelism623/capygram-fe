import { request } from "@/utils/axios-http/axios-http";

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
    const { refreshToken, accessToken } = response.data.value;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);

    //getMe();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const getMe = 