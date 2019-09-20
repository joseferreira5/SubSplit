import axios from 'axios';

export default {
  userLogin: function() {
    return axios.post('/api/users/login/');
  },
  userLogout: function() {
    return axios.post('/api/users/logout/');
  },
  userRegistration: function() {
    return axios.post('/api/users/registration/');
  },
  inviteeRegistration: function(token) {
    return axios.post('/api/users/registration/' + token);
  },
  getSubs: function() {
    return axios.get('/api/dashboard/');
  },
  addSub: function() {
    return axios.post('/api/dashboard/addsub/');
  },
  invite: function() {
    return axios.post('/api/dashboard/invite/');
  }
};
