import { Login } from '../services/AuthService.js';
//import Cookies from "js-cookie"

export const useLogin = () => {
  const login = async (username, password) => {
    const  user = await Login(username,password);
    if(user){
      //Cookies.set("currentUser",JSON.stringify(user));
      console.log(user)
    }
    return user;

  };
  return {login}
}

