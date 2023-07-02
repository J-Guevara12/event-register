import axios from "axios"

/*export class AuthService{
	login = (email, password) => {
    return axios.post("/api/login",{
      email: email,
      password: password 
    }).then((res) => {
      return {
        userName: res.data.username,
        accessToken: res.data.acces_token,
      };
    })
	}
}*/
export function Login (email, password) {
  return axios.post("/api/login",{
    email: email,
    password: password 
  }).then((res) => {
    return {
      userName: res.data.username,
      accessToken: res.data.acces_token,
    };
  })
}
