import { useRouter } from 'next/navigation';

import { Login } from '../services/AuthService.js';

export const useLogin = (setUser) => {
  const router = useRouter()

  const login = async (username, password) => {

    const  user = await Login(username,password);

    if(user){
      setUser(user)
      router.push("/home")
    }

  };
  return login
}

