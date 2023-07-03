"use client"

import { useContext } from "react"

import {AuthContext} from "../context/AuthContext"

import WindowContainer from "../components/WindowContainer"
import EventContainer from "../components/EventContainer"
import PageRedirect from "../components/PageRedirect"

export default function Home() {
  const [user] = useContext(AuthContext)
  return (
    <WindowContainer size={"lg"}>
      {
      user.accessToken?
          <EventContainer />:
          <PageRedirect/>
      }
    </WindowContainer>
  )
}
