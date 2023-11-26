
import { useNavigate, useParams } from "react-router-dom";

import { LayoutBase } from "../../compartilhar/layout";
import { FerramentasDetalhe } from "../../compartilhar/components";
import { useEffect, useRef, useState } from "react";
import { PessoasService } from "../../compartilhar/servicos/api/alunos/PessoasService";

import { Form } from '@unform/web';

import { VTextField, VForm, useVForm } from '../../compartilhar/formularios';
import { FormHandles } from "@unform/core";
import { AutoComplet } from "./componentes/AutoComplet";
import { Box, Grid } from "@mui/material";

interface IFormData {
  email: string;
  nomeCompleto: string;
  escolaId: number;
}








export const DetalheAlunos: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const {formRef, save, SaveAndClose, isSaveAndClose } = useVForm();

    const [nome, setNome] = useState('');

    useEffect(() => {


        if (id !== 'nova') {
           PessoasService.getById(Number(id))
           .then((result) => {
             if(result instanceof Error) {
                alert(result.message);
                navigate('/pessoas');
             } else {
                setNome(result.nomeCompleto);
                formRef.current?.setData(result);
             }
           });
        } else {
          formRef.current?.setData({
            email: '',
            escolaId: undefined,
            nomeCompleto: '',
          });
        }
    }, [id])



    const handleSave = (dados: IFormData ) => {

     
        
        if (id === 'nova') {
          PessoasService.create(dados)
          .then((result) => {

            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (isSaveAndClose()) {
                navigate('/pessoas/');
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
                
            }

          });

        } else {
          PessoasService.updateById(Number(id), {id:Number(id), ...dados})
          .then((result) => {

            if (result instanceof Error) {
              alert(result.message)
            } else {
              
              if (isSaveAndClose()) {
                navigate('/pessoas/');
              } 
            }

          });

        }

    };




    const handleDelete = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Realmente deseja apagar?')){
          PessoasService.deleteById(id)
          .then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
                navigate('/pessoas');         
            }
          });
        }
      
      }


    return (
        <LayoutBase 
        titulo={id === 'nova' ? 'Nova aluna' : nome}
        barraFerramentas={
           <FerramentasDetalhe
                textoBotaoNovo="Nova"
                mostrarSalvareFechar
                mostrarApagar={id !== 'nova'}
                mostrarNovo={id !== 'nova'}

                clicarEmSalvar={save}
                clicarEmSalvarEFechar={SaveAndClose}
                clicarEmApagar={() => handleDelete(Number(id))}
                clicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                clicarEmVoltar={() => navigate('/pessoas')}

           /> 
        }
        >



        <VForm  ref={formRef} onSubmit={handleSave}>

        <Box>
          <VTextField placeholder="Nome completo" name='nomeCompleto' />
          <VTextField placeholder="Email" name='email' />

          <Grid container item direction="row" spacing={14}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <AutoComplet />
            </Grid>
          </Grid>
        </Box>
        </VForm >
        </LayoutBase>
        
    )
}