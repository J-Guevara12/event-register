import axios from "axios"

import { useRouter } from 'next/navigation';

import { Login } from '../services/AuthService.js';

export const useLogin = (setUser) => {
  const router = useRouter()

  const login = async (username, password) => {

    const  user = await Login(username,password);

    if(user){
      const config = {
        headers: {Authorization: `Bearer ${user.accessToken}`}
      }
      setUser(user)
      router.push("/home")
    }

  };
  return login
}

