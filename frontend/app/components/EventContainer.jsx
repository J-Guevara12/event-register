import {Box, Stack, Typography,IconButton} from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import {useContext, useEffect,useState} from "react"
import axios from "axios"

import {AuthContext} from "../context/AuthContext"
import Event from './Event'


const EventContainer = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [user] = useContext(AuthContext)

  const fetchData = () => {
    const config = {
      headers: {Authorization: `Bearer ${user.accessToken}`}
    }

    axios.get("/api/event",config).then(res=>{
      setData(res.data.events);
      setLoading(false);
    })

  }

  useEffect(() => {
    //fetchData()
  },[])

  return (
    <Box 
      sx={{
        alignSelf:'start',
        width: '100%',
        marginRight: '120',
      }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h1" variant="h4">
          Bienvenido {user.userName}
        </Typography>
        <IconButton size="large">
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
          data.map( event => <Event data={event} key={event.id}/> )
        : 
        null}
      </Stack>
    </Box>
  )
}

export default EventContainer
