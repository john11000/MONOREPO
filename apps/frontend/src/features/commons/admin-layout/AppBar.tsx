import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
// import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { ROUTE_LINK_LOGIN } from "@/constants/routes-link.constants";
import { resetCredentials } from "@/redux/slices/auth.slice";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 240;

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const menuId = "primary-search-account-menu";

const AppBar = ({ open, toggleDrawer }: Props) => {
  const appState = useSelector((state: AppStore) => state.appState);
  const authState = useSelector((state: AppStore) => state.authState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatcher = useDispatch();
  const router = useRouter();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatcher(resetCredentials());
    handleMenuClose();
    router.push(ROUTE_LINK_LOGIN);
  };
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box mx={2} my={2}>
        <Typography sx={{ fontWeight: "bold" }} align="center">
          {authState.user.email}
        </Typography>
      </Box>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cerrar sesión</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBarStyled position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", //  keep right padding when drawer closed
          }}
        >
          {open && (
            <IconButton onClick={toggleDrawer} color="inherit" sx={{ mr: 2 }}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {appState.appBarTitle}
          </Typography>
          {/* <Badge badgeContent={4} color="info">
            <NotificationsIcon />
          </Badge> */}
          <IconButton
            size="large"
            color="inherit"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBarStyled>
      {renderMenu}
    </>
  );
};

export default AppBar;
