import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { LayoutBase } from '../../compartilhar/layout';
import { useEffect, useState } from 'react';
import { PessoasService } from '../../compartilhar/servicos/api/alunos/PessoasService';


export const Dashboard = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

   useEffect(() => {
   
    setIsLoading(true);

    PessoasService.getAll(1)
      .then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCount(result.totalCount);
        }
      });
  }, []);


  return (
    <LayoutBase
      titulo='Home'          
    >
      

    <Box width='100%' display={'flex'} >
      <Grid container marginTop={25}>
        <Grid item container>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

            <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Número de Alunas
                  </Typography> 

                   <Box padding={6} display='flex' justifyContent='center' alignItems='center'>                 
                  {!isLoading && (
                      <Typography variant='h1'>
                        {totalCount}
                      </Typography>
                    )}
                    {isLoading && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                    </Box>                
                </CardContent>
            </Card>
            
          </Grid>

        </Grid>
      </Grid>
    </Box>

    </LayoutBase>
  );
};