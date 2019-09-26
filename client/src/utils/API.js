import axios from 'axios';
import auth from './auth';

function getHeaders() {
  const token = auth.getToken();

  return {
    headers: {
      Authorization: `JWT ${token}`
    }
  };
}

export default {
  userLogin: function(credentials) {
    return axios.post('/api/user/login', credentials).then(({ data }) => {
      auth.setToken(data.token);
      return data.user;
    });
  },
  userLogout: function() {
    return axios.get('/api/user/logout').then(() => {
      auth.removeToken();
    });
  },
  getUserInfo: () => {
    return axios.get('api/user', getHeaders()).then(({ data }) => {
      return data.user;
    });
  },
  userRegistration: function(data) {
    return axios.post('/api/user/register', data);
  },
  inviteeRegistration: function(inviteToken) {
    return axios.post('/api/user/registration' + inviteToken);
  },
  getSubs: () => {
    return axios.get('/api/dashboard', getHeaders());
  },
  getServices: () => {
    return axios.get('api/dashboard/services');
  },
  addSub: data => {
    return axios.post('/api/dashboard/addsub', data, getHeaders());
  },
  invite: data => {
    return axios.post('/api/dashboard/invite', data, getHeaders());
  }
};
