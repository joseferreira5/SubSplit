export const TOKEN_KEY = 'subsplittoken';

const auth = {
  isAuthenthicated() {
    return localStorage.getItem(TOKEN_KEY) !== null;
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
  }
};

export default auth;
