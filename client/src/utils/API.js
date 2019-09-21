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
    return axios.post('/api/user/login/', credentials).then(({ data }) => {
      console.log('part one');
      auth.setToken(data.token);
    });
  },
  userLogout: function() {
    return axios.post('/api/users/logout/').then(() => {
      auth.removeToken();
    });
  },
  userRegistration: function(data) {
    return axios.post('/api/user/register', data);
  },
  inviteeRegistration: function(inviteToken) {
    return axios.post('/api/user/registration/' + inviteToken);
  },
  getSubs: () => {
    return axios.get('/api/dashboard/', getHeaders());
  },
  getServices: () => {
    return axios.get('api/dashboard/services/');
  },
  addSub: data => {
    return axios.post('/api/dashboard/addsub/', data, getHeaders());
  },
  invite: () => {
    return axios.post('/api/dashboard/invite/', getHeaders());
  }
};
