import { useState, useContext } from "react";

import { Dialog, DialogTitle, DialogContent, FormControl } from "@mui/material"
import { TextField, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { DialogActions, FormHelperText } from '@mui/material'
import {DateTimePicker} from "@mui/x-date-pickers";

import dayjs from "dayjs";
import axios from "axios"

import {AuthContext} from "../context/AuthContext"

const EventInput = ({data, handleClose, event, setEvent}) => {
  const [user] = useContext(AuthContext)

  const handleSubmit = ()=>{
    if(!event.name){
      setErrors({...errors,name: {enabled: true, message: "Campo obligatorio"}})
      return
    }
    if(!event.place){
      setErrors({...errors,place: {enabled: true, message: "Campo obligatorio"}})
      return
    }
    if(!event.date){
      console.log('hey')
      setErrors({...errors,date: {enabled: true, message: "Campo obligatorio"}})
      return
    }
    if(!event.modality){
      setErrors({...errors,modality: {enabled: true, message: "Campo obligatorio"}})
      return
    }
    const config = {
      headers: {Authorization: `Bearer ${user.accessToken}`}
    }
    data.create?
      axios.post("/api/event",{event: event, ...config}):
      axios.put("/api/event",{event: event, ...config})

  }

  const [errors, setErrors] = useState({
    name: {
      enabled: false,
      message: "",
    },
    place: {
      enabled: false,
      message: "",
    },
    date: {
      enabled: false,
      message: "",
    },
    modality: {
      enabled: false,
      message: "",
    },
  })

  return (
    <Dialog open={data.open} onClose={handleClose}>
      <DialogTitle>
        {data.create? 'Crear Evento': 'Editar evento'}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          autoFocus
          required
          fullWidth
          value={event.name}
          error={errors.name.enabled}
          helperText={errors.name.message}
          id="name"
          label="Nombre"
          onChange={e => {
            setErrors({...errors,name: {enabled: false, message: ""}})
            setEvent({...event, name: e.target.value})
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="place"
          label="Lugar"
          error={errors.place.enabled}
          helperText={errors.place.message}
          onChange={e => {
            setEvent({...event, place: e.target.value})
            setErrors({...errors,place: {enabled: false, message: ""}})
          }}
        />
        <DateTimePicker 
          format="DD/MM/YYYY hh:mm A"
          sx={{widht: '20%'}} 
          label="Fecha*" 
          value={dayjs(event.date)}
          onChange={(e)=>
              setEvent({...event,date: e.$d})
          }
          slotProps={{
            textField: {fullWidth: true, margin: 'normal'} 
          }}
        />
        <FormControl fullWidth margin='normal'>
          <InputLabel error={errors.modality.enabled} id="modality-label">Modalidad</InputLabel>
          <Select
            labelId="modality-label"
            id="modality"
            label="Modalidad"
            value={event.modality}
            error={errors.modality.enabled}
            onChange={e=>{
              setEvent({...event, modality: e.target.value})
              setErrors({...errors,modality: {enabled: false, message: ""}})
            }}
          >
            <MenuItem value={'presencial'}>Presencial</MenuItem>
            <MenuItem value={'virtual'}>Virtual</MenuItem>
          </Select>
          <FormHelperText 
            error={errors.modality.enabled}>{errors.modality.message}
          </FormHelperText>
        </FormControl>
        <DialogActions>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </DialogActions>

      </DialogContent>
    </Dialog>
  )
}
export default EventInput
