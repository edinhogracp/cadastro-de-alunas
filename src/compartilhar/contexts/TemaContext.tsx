import { createContext, useCallback, useState, useMemo, useContext } from 'react';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import { EscuroTema, LuzTema } from './../temas';
import { Box } from '@mui/material';



interface ITemaContextData {
    themeName: 'claro' | 'escuro';
    toggleTheme: () => void;
}

const TemaContext = createContext( {} as ITemaContextData );

export const useAppThemeContext = () => {
    return useContext(TemaContext);
}


export const AppThemeProvider: React.FC<{children: React.ReactNode}> =({ children }) => {

const [themeName, setThemeName] = useState<'claro' | 'escuro'>('claro');

const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'claro' ? 'escuro':'claro')
}, []);

const theme = useMemo(()=> {
        if(themeName === 'claro') return LuzTema;

        return EscuroTema;
}, [themeName]);

    return(
    <TemaContext.Provider value={{ themeName, toggleTheme }}>
        <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
        { children }
        </Box>
        </ThemeProvider>
    </TemaContext.Provider>
    );
}