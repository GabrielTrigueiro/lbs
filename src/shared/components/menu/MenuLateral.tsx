import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Button, Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText, useMediaQuery
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Navigate, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import styles from "../../../styles/SideBar/SideBar.module.scss";
import { useAuthContext, useSideBarContext } from "../../contexts";
import { AppBarProps, IListItemLinkProps } from "../../models/appBar";
import MenuIcon from "./MenuIcon";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderColor: "transparent",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//propriedades da sideBar
const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {

  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);

  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton
      selected={!!match}
      sx={{
        height: 60,
        "&.Mui-selected": {
          borderRight: "6px solid #E4DB00",
        },
      }}
      onClick={handleClick}
    >
      <ListItemIcon>
        <Icon sx={{ fontSize: "2rem", color: match ? "#E4DB00" : "black" }}>
          {icon}
        </Icon>
      </ListItemIcon>
      <ListItemText className="TextIcon" primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC = ({ children }) => {

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { sideBarOption, toggleSideBar } = useSideBarContext();

  const { isAuthenticated, login } = useAuthContext()

  const handleDrawerOpenOrClose = () => {
    open ? setOpen(false) : setOpen(true);
  };

  if (!isAuthenticated) return <Navigate replace to="/"/>
  return (
    <Box className={styles.container}>

      {/* Navbar */}
      <AppBar className={styles.navbar}>
          <MenuIcon />
      </AppBar>

      {/* SideBar */}
      <Drawer
        className={styles.sideBar}
        variant={smDown ? "temporary" : "permanent"}
        open={open}
        onClose={toggleSideBar}
      >
        {/* <DrawerHeader></DrawerHeader> */}
        <Box className={styles.sideBarLinks}>
          <List component="nav">
            {sideBarOption.map((drawerOption) => (
              <ListItemLink 
                to={drawerOption.path}
                key={drawerOption.path}
                icon={drawerOption.icon}
                label={drawerOption.label}
                onClick={smDown ? toggleSideBar : undefined}
              />
            ))}
          </List>
        </Box>
        <div className={styles.sideBarButtonContainer} onClick={handleDrawerOpenOrClose}>
          <div className={styles.sideBarButton}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </div>
        </div>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
