import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IListagemEscolas, EscolasService, } from '../../compartilhar/servicos/api/escolas/EscolasService';
import { FerramentasListagem } from '../../compartilhar/components';
import { LayoutBase } from '../../compartilhar/layout';
import { useDebounce } from '../../compartilhar/hooks';
import { Environment } from '../../compartilhar/environment';


export const ListagemEscolas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate();



  const [rows, setRows] = useState<IListagemEscolas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);



  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      EscolasService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);

            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [busca, pagina]);


const handleDelete = (id: number) => {
  // eslint-disable-next-line no-restricted-globals
  if (confirm('Realmente deseja apagar?')){
    EscolasService.deleteById(id)
    .then(result => {
      if (result instanceof Error) {
        alert(result.message)
      } else{
        setRows(oldRows => {
          return [
            ...oldRows.filter(oldRows => oldRows.id !== id)
          ]
        });
        
      }
    });
  }

}

  return (
    <LayoutBase
      titulo='Listagem de escolas'
      barraFerramentas={
        <FerramentasListagem
          mostrarInputBusca
          busca={busca}
          textoBotaoNovo='Nova'
          clicarEmNovo={() => navigate('/escolas/detalhe/nova')}
          aoMudarTextoBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
        />
      }
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                  onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                  onClick={() => navigate(`/escolas/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell> 
                    <Pagination
                    page={pagina} 
                    count={Math.ceil
                      (totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                    />           
                </TableCell>
              </TableRow>
            )}
            
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBase>
  );
};