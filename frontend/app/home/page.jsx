"use client"

import { useContext } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

import {AuthContext} from "../context/AuthContext"

import WindowContainer from "../components/WindowContainer"
import EventContainer from "../components/EventContainer"
import PageRedirect from "../components/PageRedirect"

export default function Home() {
  const [user] = useContext(AuthContext)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <WindowContainer size={"lg"}>
        {
        user.accessToken?
            <EventContainer />:
            <PageRedirect/>
        }
      </WindowContainer>
    </LocalizationProvider>
)
}
