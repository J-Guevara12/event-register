import { Login } from '../services/AuthService.js';
import axios from "axios"

export const useLogin = () => {
  const login = async (username, password) => {
    const  user = await Login(username,password);
    if(user){
      console.log(user)

      const config = {
        headers: {Authorization: `Bearer ${user.accessToken}`}
      }
      console.log(config)

      axios.get("/api/event",config)
        .then((res) => { console.log(res)})
        .catch(err=>console.log(err));
    }
    return user;

  };
  return login
}

