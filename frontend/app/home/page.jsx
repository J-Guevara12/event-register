"use client"

import { useContext } from "react"

import {AuthContext} from "../context/AuthContext"

export default function Home() {
  const [user, setUser] = useContext(AuthContext)
  return (
    <h1>
      Hello {user.userName}
    </h1>
  )
}
