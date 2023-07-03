import axios from "axios"

import { useRouter } from 'next/navigation';

import { Login } from '../services/AuthService.js';

export const useLogin = () => {
  const router = useRouter()
  const login = async (username, password) => {
    const  user = await Login(username,password);
    if(user){
      console.log("saving in context")
      const config = {
        headers: {Authorization: `Bearer ${user.accessToken}`}
      }
      axios.get("/api/event",config)
        .then((res) => { console.log(res)})
        .catch(err=>console.log(err));
      //router.push("/home")
    }



    return user;

  };
  return login
}

