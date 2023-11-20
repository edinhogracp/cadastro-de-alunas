import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useNavigate, useMatch, useResolvedPath } from "react-router-dom";



interface IListItemProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;

}


const ListItem: React.FC<IListItemProps> = ({ to, icon, label, onClick}) => {

    const navigate = useNavigate();


    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false  })


    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
            <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton> 
    );

}


 interface IMenuLateralProps {
    children: React.ReactNode
} 

export const MenuLateral: React.FC<IMenuLateralProps > = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawer, drawerOptions } = useDrawerContext();
    const { toggleTheme  } = useAppThemeContext();


    return(
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawer}>
            <Box width={theme.spacing(30)} height="100%" display="flex" flexDirection="column">

            <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                <Avatar 
                sx={{ height: theme.spacing(12), width: theme.spacing(12)}}                
                 src="https://yt3.ggpht.com/xrfa2TASsXAtX-7tIbv3kkavESNCmEfDNZm_FfprutBSAfFQIfYDgOSrDTUXtHBoLhS40EMGqw=s88-c-k-c0x00ffffff-no-rj" />
            </Box>

                <Divider />

            <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItem
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawer : undefined}
                />
              ))}
            </List>           
            </Box>
            <Box>
            <List component="nav">
                <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                <Icon>contrast</Icon>
                </ListItemIcon>
                <ListItemText primary="Trocar tema" />
        </ListItemButton> 
            </List>           
            </Box>

            </Box>           
            </Drawer> 
        
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(35)}>
                {children}
            </Box>
        </>
    );

}