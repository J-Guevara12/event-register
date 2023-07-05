import axios from "axios"

export function Login (email, password) {
  /*
  function that performs the login and returns the user info
  */
  return axios.post("/api/login",{
    email: email,
    password: password 
  }).then((res) => {
    return {
      userName: res.data.username,
      accessToken: res.data.access_token,
    };
  })
}
