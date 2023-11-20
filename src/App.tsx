
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider } from './compartilhar/contexts';

import { MenuLateral } from './compartilhar/components';


export const App = ( ) => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
            

        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

