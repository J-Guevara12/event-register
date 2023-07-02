import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ACB6E5',
    },
    secondary: {
      main: '#74ebd5',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
