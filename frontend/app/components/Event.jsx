import { Paper, Box, Stack, Typography, IconButton } from "@mui/material"

import LaptopTwoToneIcon from '@mui/icons-material/LaptopTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Event = ({ handleDelete, handleEdit, data }) =>{
  const processDate = (date) => {
    let components = date.split(" ")
    let hour = components[4]
    return `${components[1]} - ${components[2]} -
      ${components[3]} a las ${hour.slice(0,-3)}`
  }
  return (
    <Box sx={{width:'100%'}}>
    <Paper elevation={3}>
      <Box>
        <Stack 
          direction="row" 
          alignItems='center' 
          justifyContent='space-between' 
          spacing={3}
          p={2}
        >
          <Stack 
            spacing={2} 
            direction="row" 
            alignItems='flex-start' 
            justifyContent="center">
          {data.modality==="presencial"?
            <PersonOutlineTwoToneIcon 
              style={{margin: '15',fontSize: "84px", color: '#ACB6E5'}}/>:
            <LaptopTwoToneIcon 
              style={{margin: '15',fontSize: "84px", color: '#ACB6E5'}}/>
          }
            <Stack direction="column" alignItems='flex-start' justifyContent="center">
              <Typography variant="h5">
                {data.name}
              </Typography>
              <Typography variant="body1">
                {processDate(data.date)}
              </Typography>
              <Typography variant="body2">
                {data.place}
              </Typography>
            </Stack>
          </Stack>
          <Stack 
            pr={3}
            spacing={4} 
            direction="row" 
            alignItems='flex-start' 
            justifyContent="center">
            <IconButton onClick={()=>handleEdit(data)}>
              <EditRoundedIcon />
            </IconButton>
            <IconButton onClick={()=>handleDelete(data.id)}>
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Paper>
    </Box>
  )
}

export default Event
