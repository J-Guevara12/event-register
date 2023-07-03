import theme from '../theme'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material';

const WindowContainer = ({size, children}) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth={size}>
        <Box>
          <Paper
            elevation={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
              pt:5,
              px:10,
              py: 5,
            }}>
            {children}
        </Paper>
        </Box>
      </Container>
    </ThemeProvider>

  )
}
export default WindowContainer
