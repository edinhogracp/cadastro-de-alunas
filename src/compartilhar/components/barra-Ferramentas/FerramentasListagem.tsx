import { Box, Button, Paper, TextField, useTheme } from '@mui/material';


import { Environment } from '../../environment';

interface IFerramentasListagemProps {
    busca?: string,
    mostrarInputBusca?: boolean,
    aoMudarTextoBusca?: (novoTexto: string) => void; 
    textoBotaoNovo?: string,
    mostrarBotaoNovo?: boolean,
    clicarEmNovo?: () => void;    
}   



export const FerramentasListagem: React.FC<IFerramentasListagemProps> = ({
    busca = '',
    aoMudarTextoBusca,
    mostrarInputBusca = false,    
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = 'true',
    clicarEmNovo,
}) => {
    const theme = useTheme();



    return (
        <Box height={theme.spacing(7)}  marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" component={Paper} >

          {mostrarInputBusca &&(
              <TextField
              size='small'
              value={busca}
              onChange={(e) => aoMudarTextoBusca?.(e.target.value)}
              placeholder={Environment.INPUT_DE_BUSCA}
          />

          )}

        <Box flex={1} display="flex">
            {mostrarBotaoNovo && (
                <Button
                color='inherit'
                disableElevation
                variant='contained'
                onClick={clicarEmNovo}
            >{textoBotaoNovo}</Button>
          
            )}
        </Box>  
        </Box>
    )
}