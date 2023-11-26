
import { useNavigate, useParams } from "react-router-dom";

import { LayoutBase } from "../../compartilhar/layout";
import { FerramentasDetalhe } from "../../compartilhar/components";
import { useEffect, useRef, useState } from "react";
import { EscolasService } from "../../compartilhar/servicos/api/escolas/EscolasService";

import { Form } from '@unform/web';

import { VTextField, VForm, useVForm } from '../../compartilhar/formularios';
import { FormHandles } from "@unform/core";

interface IFormData {

  nome: string;
  
}




export const DetalheEscolas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const {formRef, save, SaveAndClose, isSaveAndClose } = useVForm();

    const [nome, setNome] = useState('');



    useEffect(() => {

        if (id !== 'nova') {
           EscolasService.getById(Number(id))
           .then((result) => {
             if(result instanceof Error) {
                alert(result.message);
                navigate('/escolas');
             } else {
                setNome(result.nome);
                formRef.current?.setData(result);
             }
           });
        } else {
          formRef.current?.setData({
             nome: '',
          });
        }
    }, [id])



    const handleSave = (dados: IFormData ) => {
        
        if (id === 'nova') {
          EscolasService.create(dados)
          .then((result) => {

            if (result instanceof Error) {
              alert(result.message)
            } else {
              if (isSaveAndClose()) {
                navigate('/escolas/');
              } else {
                navigate(`/escolas/detalhe/${result}`);
              }
                
            }

          });

        } else {
          EscolasService.updateById(Number(id), {id:Number(id), ...dados})
          .then((result) => {

            if (result instanceof Error) {
              alert(result.message)
            } else {
              
              if (isSaveAndClose()) {
                navigate('/escolas/');
              } 
            }

          });

        }

    };




    const handleDelete = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Realmente deseja apagar?')){
          EscolasService.deleteById(id)
          .then(result => {
            if (result instanceof Error) {
              alert(result.message)
            } else {
                navigate('/escolas');         
            }
          });
        }
      
      }


    return (
        <LayoutBase 
        titulo={id === 'nova' ? 'Nova escola' : nome}
        barraFerramentas={
           <FerramentasDetalhe
                textoBotaoNovo="Nova"
                mostrarSalvareFechar
                mostrarApagar={id !== 'nova'}
                mostrarNovo={id !== 'nova'}

                clicarEmSalvar={save}
                clicarEmSalvarEFechar={SaveAndClose}
                clicarEmApagar={() => handleDelete(Number(id))}
                clicarEmNovo={() => navigate('/escolas/detalhe/nova')}
                clicarEmVoltar={() => navigate('/escolas')}

           /> 
        }
        >



        <VForm  ref={formRef} onSubmit={handleSave}>

          <VTextField placeholder="Nome" name='nome' />
          



        </VForm >
        </LayoutBase>
        
    )
}