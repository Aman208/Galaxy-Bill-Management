// import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import { NavLink,  useLocation } from 'react-router-dom'
import React, { useContext } from 'react';
import { UserContext } from '../../../Context/UserContext'
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import styles from './Sidebar.module.css'

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,

    [theme.breakpoints.up('xs')]: {
        width: 0,
    },
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function Sidebar({ open, handleDrawerClose, handleDrawerOpen }) {

    let selectedItem = useLocation().pathname.split('/')[1]
    // console.log(selectedItem);

    const { isLoggedIn, currentUser, signOutUser } = useContext(UserContext);

    const [openUserCollapse, setOpenUseCollapse] = React.useState(false);

    const theme = useTheme();

    function handleUserClicked() {
        setOpenUseCollapse(!openUserCollapse);
    }

    function handleMouseLeavesDrawer() {
        setOpenUseCollapse(false);
        handleDrawerClose()
    }

    React.useEffect(() => {

    }, [selectedItem])


    return (
        <Drawer className={styles.sidebar} variant="permanent" open={open} onMouseEnter={handleDrawerOpen} onMouseLeave={handleMouseLeavesDrawer} PaperProps={{ sx: { backgroundColor: '#31b372', color: 'white' } }}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                    <MenuIcon style={{ color: '#fff' }} />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem key={"Dashboard"} disablePadding sx={{ display: 'block' }}>
                    {/* <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }} > */}
                    <ListItemButton
                        selected={!selectedItem ? true : false}
                        component={NavLink}
                        to="/"
                        style={{ textDecoration: 'none', color: 'white' }}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#1b4f32",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#1b4f32",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: '#fff'
                            }}
                        >
                            <DashboardOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    {/* </NavLink> */}
                </ListItem>

                <ListItem key={"Customer"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/customers"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem == "customers" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#1b4f32",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#1b4f32",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <PersonIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Customers"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>


                {<ListItem key={"Products"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/products"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem == "products" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#1b4f32",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#1b4f32",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <VaccinesIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Products"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                }

                {<ListItem key={"Price Manager"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/price-manager"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem == "price-manager" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#1b4f32",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#1b4f32",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <GroupIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Price Manager"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                }


                {<ListItem key={"Generate Bill"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/bill"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem == "bill" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#1b4f32",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#1b4f32",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <GroupIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"Geenrate Bill"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                }

                {<ListItem key={"View Bill"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/view-bill"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem == "view-bill" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#1b4f32",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#1b4f32",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <GroupIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"View Bill"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                }

                {<ListItem key={"Admin View Bill"} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        component={NavLink}
                        to="/view-bill-admin"
                        style={{ textDecoration: 'none', color: 'white' }}
                        selected={selectedItem == "view-bill-admin" ? true : false}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            "&.Mui-selected": {
                                backgroundColor: "#1b4f32",
                            },
                            "&.Mui-selected:hover": {
                                backgroundColor: "#1b4f32",
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <GroupIcon style={{ color: '#fff' }} />
                        </ListItemIcon>
                        <ListItemText primary={"View Bill Admin"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
                }




            </List>
            <Divider />

        </Drawer>
    );
}