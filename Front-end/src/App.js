import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import BaseRouter from './Routes';

const theme = createMuiTheme({
    breakpoints:{
        values:{
            xs:0,
            sm:600,
            md:768,
            lg:1280,
            xl:1920,
        }
    },
    palette: {
        primary: {
        //  main: '#24328F',
          main: '#273459',
        },
        secondary: {
         // main: '#C21E56',
          main: '#BF3064',
        },
    },
})

function App() {
  
  return (
    <div className='container'>
        <ThemeProvider theme={theme}>
        <BaseRouter/>
        </ThemeProvider>
    </div>
  );
}

export default App;