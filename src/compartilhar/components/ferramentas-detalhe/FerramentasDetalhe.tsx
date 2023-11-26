
import { Box, Button, Paper, useTheme, Divider, Skeleton, Typography, Icon } from '@mui/material';

interface IFerramentasDetalheProps {
    textoBotaoNovo?: string;

       
    mostrarBotaoSalvarCarregando?: boolean;
   

    clicarEmNovo?: () => void;
    clicarEmVoltar?: () => void;
    clicarEmApagar?: () => void;
    clicarEmSalvar?: () => void;
    clicarEmSalvarEFechar?: () => void;


    mostrarNovo?: boolean;
    mostrarVoltar?: boolean;
    mostrarApagar?: boolean;
    mostrarSalvar?: boolean;
    mostrarSalvareFechar?: boolean;
}

export const FerramentasDetalhe: React.FC<IFerramentasDetalheProps> = ({

    textoBotaoNovo = 'Novo',

    mostrarNovo = true,
    mostrarVoltar = true,
    mostrarApagar = true,
    mostrarSalvar = true,
    mostrarSalvareFechar = false,
    
   
    mostrarBotaoSalvarCarregando = false,
  
    clicarEmNovo,
    clicarEmVoltar,
    clicarEmApagar,
    clicarEmSalvar,
    clicarEmSalvarEFechar,

}) => {

    const theme = useTheme();

return (
    <Box height={theme.spacing(7)}  marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" component={Paper} >
        
        {(mostrarSalvar && !mostrarBotaoSalvarCarregando) && (
            <Button
             color='inherit'
             disableElevation
             variant='contained'
             startIcon={<Icon>save</Icon>}
             onClick={clicarEmSalvar}
            >
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Salvar
                </Typography>
            </Button>
        )}

   {/*      {mostrarBotaoSalvarCarregando && (
        <Skeleton width={110} height={60} />
      )}
 */}
        {mostrarSalvareFechar &&  (           
            <Button
                color='inherit'
                disableElevation
                variant='outlined'
                startIcon={<Icon>save</Icon>}
                onClick={clicarEmSalvarEFechar}

            >
                
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                Salvar e fechar
                </Typography>
                
            </Button>
        )}


        {mostrarApagar && (
              <Button
              color='inherit'
              disableElevation
              variant='outlined'
              startIcon={<Icon>delete</Icon>}
              onClick={clicarEmApagar}
             >
                
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Apagar
                </Typography>
              
              </Button>
        )}

     

        {mostrarNovo && (
            <Button
            color='inherit'
            disableElevation
            variant='outlined'
            startIcon={<Icon>add</Icon>}
            onClick={clicarEmNovo}
            >

            <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                {textoBotaoNovo}
            </Typography>            
            
            </Button>
        )}


<Divider variant='middle' orientation='vertical'/>


        {mostrarVoltar &&  (
             <Button
             color='inherit'
             disableElevation
             variant='outlined'
             startIcon={<Icon>arrow_back</Icon>}
             onClick={clicarEmVoltar}
             >
                
                <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                    Voltar
                </Typography>

             </Button>
        )}             
                   

          

    </Box>
);

}