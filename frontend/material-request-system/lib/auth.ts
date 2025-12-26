export const getAccessToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("access_token")
    : null;

export const setAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getRefreshToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("refresh_token")
    : null;

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", token);
};

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
