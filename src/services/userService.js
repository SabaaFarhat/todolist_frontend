import axios from 'axios';

const baseURL = 'http://localhost:5000/users/';

export const userService = {
  signUp,
};

async function signUp(user) {
  return await axios
    .post(baseURL + 'createUser', user, {})
    .then((res) => {
      console.log('user added');
    })
    .catch((err) => {
      console.log(err);
    });
}
