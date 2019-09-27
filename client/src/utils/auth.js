export const TOKEN_KEY = 'subsplittoken';

const auth = {
  isAuthenthicated() {
    const token = localStorage.getItem(TOKEN_KEY);

    return token && token !== 'undefined';
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
