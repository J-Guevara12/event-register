import { ThemeProvider, Stack, Paper, Box, Container} from "@mui/material"
import TaskElement from "./TaskElement"
import {useContext, useEffect} from "react"


const EventContainer = () => {
  const { data, loading, fetchData } = useContext(DataContext)
  useEffect(() => {
  },[])

  return (
    <ThemeProvider>
      <Container>
      <Box mt={10} mx={10}>
        <Paper elevation={1}>
          <Stack spacing={4} p={5}>
            {(!loading && data)?
              (data.map(x => <TaskElement data={x} key={x.id} />))
              : null
            }
          </Stack>
        </Paper>
      </Box>
      </Container>
    </ThemeProvider>
  )
}

export default EventContainer
