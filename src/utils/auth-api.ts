import { SERVER_URL } from "./constants";
import { setCookie } from "./cookie";

const checkResponse = (res: Response): Promise<any> => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${SERVER_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type MyRequestInit = Overwrite<
  RequestInit,
  { headers: Record<string, string> }
>;

export const fetchWithRefresh = async (url: string, options: MyRequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      if (options.headers) {
        options.headers["authorization"] = refreshData.accessToken;
      }
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    }
    return Promise.reject(err);
  }
};
