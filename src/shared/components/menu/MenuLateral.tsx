import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Outlet, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAuthContext, useSideBarContext } from "../../contexts";
import MenuIcon from "./MenuIcon";
import { Navigate } from "react-router-dom";
import styles from "../../../styles/MenuLateral/MenuLateral.module.scss";
import {
  Box,
  Button,
  CssBaseline,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}
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
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
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
  //icon effect
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
      <CssBaseline />
      <AppBar sx={{ backgroundColor: "#575A61", boxShadow:'none' }}>
        <Toolbar
          disableGutters
          sx={{
            paddingLeft: 0,
            paddingRight: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{height: "100%", display:'flex'}}>
            <Box
              sx={{bgcolor:'transparent', width: 65, height: "100%" }}
            ></Box>
            <Box
              sx={{bgcolor:'#E4DB00' ,width: 65, height: "100%"}}
            ></Box>
          </Box>
          <MenuIcon />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={smDown ? "temporary" : "permanent"}
        open={open}
        onClose={toggleSideBar}
      >
        <DrawerHeader></DrawerHeader>
        <Box flex={1} sx={{ mt: theme.spacing(20) }}>
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
        <Box>
         
          <Button
            onClick={handleDrawerOpenOrClose}
            sx={{
              padding: 2,
              color: "#000",
              width: "100%",
              background: "#fff",
              minHeight: 48,
              px: 2.5,
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContens: "center",
                alignItems: "center",
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "#000",
              }}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Box>
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
