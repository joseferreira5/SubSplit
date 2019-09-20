import axios from 'axios';

function getToken() {
  const token = localStorage.getItem('subsplittoken');

  if (!token) {
    // send to login
  } else {
    return {
      headers: {
        Authorization: `JWT ${token}`
      }
    };
  }
}

export default {
  userLogin: function(credentials) {
    return axios.post('/api/user/login/', credentials).then(({ data }) => {
      localStorage.setItem('subsplittoken', data.token);
    });
  },
  userLogout: function() {
    return axios.post('/api/users/logout/');
  },
  userRegistration: function() {
    return axios.post('/api/users/registration/');
  },
  inviteeRegistration: function(inviteToken) {
    return axios.post('/api/users/registration/' + inviteToken);
  },
  getSubs: function() {
    return axios.get('/api/dashboard/', getToken());
  },
  addSub: function() {
    return axios.post('/api/dashboard/addsub/', getToken());
  },
  invite: function() {
    return axios.post('/api/dashboard/invite/', getToken());
  },
  cindy: function() {
    return axios.get('/api/user/cindy', getToken());
  }
};
