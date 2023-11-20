import { ReactNode } from "react";
import { Box } from "@mui/system";
import { Typography, useTheme, IconButton, Icon,useMediaQuery, Theme } from "@mui/material";
import { useDrawerContext } from "../contexts";


interface ILayoutBaseProps {
    titulo: string,
    children: ReactNode,
    barraFerramentas?: ReactNode,
}

export const LayoutBase: React.FC<ILayoutBaseProps> = ({children, titulo, barraFerramentas}) => {

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const { toggleDrawer } = useDrawerContext();


    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            <Box padding={1} display={"flex"}alignItems={"center"} gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} >
               
               {smDown && (
                <IconButton onClick={toggleDrawer}>
                <Icon>menu</Icon>
                </IconButton> 
               )}
               
                <Typography 
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipses"
                    variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
                >
                    {titulo}
                </Typography>
                
            </Box>    
            
            {barraFerramentas && (
                  <Box>
                  {barraFerramentas}
              </Box>     
            )}
            

            <Box flex={1} overflow={"auto"}>
            {children}
            </Box>  

           
        </Box>
    );

}