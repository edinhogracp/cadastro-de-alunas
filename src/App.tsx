
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from "./routes";
import { AppThemeProvider, AuthProvider, DrawerProvider } from './compartilhar/contexts';

import { Login, MenuLateral } from './compartilhar/components';


export const App = ( ) => {
  return (
    <AuthProvider>
    <AppThemeProvider>

      <Login>

        <DrawerProvider>
          <BrowserRouter>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
        </DrawerProvider>

      </Login>

    </AppThemeProvider>
  </AuthProvider>
  );
}

