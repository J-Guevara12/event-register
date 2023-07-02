import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#74ebd5',
    },
    secondary: {
      main: '#ACB6E5',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
