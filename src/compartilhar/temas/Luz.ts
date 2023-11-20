import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';


export const LuzTema = createTheme({
    palette: {
        primary: {
          main: blue[500],
          dark: blue[700],
          light: blue[300],
          contrastText: '#fffff',  
        },
        secondary: {
            main: purple[500],
            dark: purple[700],
            light: purple[300],
            contrastText: '#fffff',
        },
        background: {
            default: '#f7f5f3',
            paper: '#fffff',
        },
    }
});