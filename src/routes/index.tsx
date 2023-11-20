import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../compartilhar/contexts";
import { useEffect } from "react";
import { Dashboard, ListagemPessoas } from "../pages";

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
          {
            icon: 'home',
            path: '/pagina-inicial',
            label: 'Página inicial',
          },
          {
            icon: 'school',
            path: '/alunos',
            label: 'Alunos',
          },
        ]);
      }, []);

    return (

        <Routes> 
            <Route path="/principal" element={<Dashboard />}/> 

            <Route path="/alunos" element={<ListagemPessoas/>} />
      {/* <Route path="/pessoas/detalhe/:id" element={<Dashboard />} /> */}

            <Route path="*" element={<Navigate to="/principal" />} />           
        </Routes>
    );
}

