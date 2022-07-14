import axios from 'axios';

const baseURL = 'http://localhost:5000/auth/';

export const authService = {
  signIn,
};

async function signIn(user) {
  return await axios
    .post(baseURL + 'login', user, {})
    .then((res) => {
      console.log('user connected');
    })
    .catch((err) => {
      console.log(err);
    });
}
