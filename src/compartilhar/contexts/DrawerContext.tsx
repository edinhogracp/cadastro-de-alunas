import { createContext, useCallback, useState, useMemo, useContext } from 'react';
import { ThemeContext, ThemeProvider } from '@emotion/react';
import { EscuroTema, LuzTema } from './../temas';
import { Box } from '@mui/material';


interface IDrawerOptions {
  icon: string;
  path: string;
  label: string;
}


interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOptions[];
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
    toggleDrawer: () => void;
  }
  
  const DrawerContext = createContext({} as IDrawerContextData);
  
  export const useDrawerContext = () => {
    return useContext(DrawerContext);
  };
  
  export const DrawerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);
  
    const toggleDrawer = useCallback(() => {
      setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
      setDrawerOptions(newDrawerOptions);
    }, []);
  
    return (
      <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawer, setDrawerOptions: handleSetDrawerOptions }}>
        {children}
      </DrawerContext.Provider>
    );
  };