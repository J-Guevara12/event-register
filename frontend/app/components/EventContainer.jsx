import {Box, Stack, Typography,IconButton} from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {useContext, useEffect,useState} from "react"
import axios from "axios"
import dayjs from "dayjs"

import {AuthContext} from "../context/AuthContext"
import Event from './Event'
import EventInput from './EventInput'

const EventContainer = () => {
  const [user] = useContext(AuthContext)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentEvent, setCurrentEvent] = useState({
    id: '',
    name: '',
    date: dayjs().$d,
    place: '',
    modality: '',
  })
  const [dialogData, setDialogData] = useState({
    open: false,
    create: true,
  })


  const fetchData = () => {
    const config = {
      headers: {Authorization: `Bearer ${user.accessToken}`}
    }

    axios.get("/api/event",config).then(res=>{
      setData(res.data.events);
      setLoading(false);
    })
  }

  const handleCreateEvent = () => {
    setDialogData({
    open: true,
    create: true,
    })
    setCurrentEvent({
      id: '',
      name: '',
      date: dayjs().$d,
      place: '',
      modality: '',
    })
  }
  const handleEditEvent = (event) => {
    setDialogData({
    open: true,
    create: false,
    })
    setCurrentEvent(event)
  }
  const handleClose = () => {
    setDialogData({
    open: false,
    create: true,
    })
  }

  const handleDeleteEvent = (id) => {
    const config = {
      data: {id: id},
      headers: {'Content-Type': 'application/json', 
        Authorization: `Bearer ${user.accessToken}`}
    }

    axios.delete("/api/event",config).then(setTimeout(fetchData,50))
  }

  useEffect(() => {
    setTimeout(fetchData,50) // Delay between the order and the API call to ensure the data returned is the updated one
  },[dialogData])

  return (
    <Box 
      sx={{
        alignSelf:'start',
        width: '100%',
        marginRight: '120',
      }}>
      <EventInput 
        event = {currentEvent}
        setEvent = {setCurrentEvent}
        data={dialogData} 
        handleClose={handleClose} 
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h1" variant="h4">
          Bienvenido {user.userName}
        </Typography>
        <IconButton size="large" onClick={handleCreateEvent}>
          <AddRoundedIcon style={{fontSize: "50px"}}/>
        </IconButton>
      </Stack>
      <Stack 
        marginTop={5} 
        direction="column" 
        spacing ={2}
        sx={{width: '100%'}}
      >
        {(!loading && data)? 
          data.map( event => <Event 
            handleEdit={handleEditEvent} 
            handleDelete={handleDeleteEvent}
            data={event} 
            key={event.id}
            /> )
        : 
        null}
      </Stack>
    </Box>
  )
}

export default EventContainer
