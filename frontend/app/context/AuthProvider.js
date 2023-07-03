'use client'

import {AuthContext} from './AuthContext'
import {useState} from 'react'

export default function AuthProvider({children}){
  const [user,setUser] = useState({userName: "", accessToken: ""});
  return (
    <AuthContext.Provider value={[user,setUser]}>
      {children}
    </AuthContext.Provider>
  )
}
