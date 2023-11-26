import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../compartilhar/contexts";
import { useEffect } from "react";
import { Dashboard, ListagemPessoas, DetalheAlunos } from "../pages";
import { ListagemEscolas } from "../pages/escolas/ListagemEscolas";
import { DetalheEscolas } from "../pages/escolas/DetalheEscolas";

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
          {
            icon: 'school',
            path: '/escolas',
            label: 'Escolas',
          },
       
        ]);
      }, []);

    return (

        <Routes> 
            <Route path="/principal" element={<Dashboard />}/> 

            <Route path="/alunos" element={<ListagemPessoas/>} />            
            <Route path="/pessoas/detalhe/:id" element={<DetalheAlunos />} /> 

            <Route path="/escolas" element={<ListagemEscolas/>} />            
            <Route path="/escolas/detalhe/:id" element={<DetalheEscolas />} /> 

            <Route path="*" element={<Navigate to="/principal" />} />           
        </Routes>
    );
}

