import axios from "axios"

export function Login (email, password) {
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
