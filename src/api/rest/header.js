import { STORAGE_KEY } from "constants/index";
const authHeaderAccount = (account) => {
  return {
    username: `${account.username}`,
    access_token: `${account.AccessToken}`,
  };
};
const authHeaderAndAccount = () => {
  return {
    access_token: `${localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)}`,
    username: `${localStorage.getItem(STORAGE_KEY.USER_CURRENT)}`,
  };
};
const authHeader = () => {
  return {
    access_token: `${localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)}`,
  };
};
const headerRefreshToken = () => {
  return {
    refresh_token: `${localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN)}`,
  };
};
export {
  authHeaderAccount,
  authHeaderAndAccount,
  authHeader,
  headerRefreshToken,
};
