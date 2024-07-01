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