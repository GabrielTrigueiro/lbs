import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import {
  Icon,
  Typography,
  CssBaseline,
  List,
  useMediaQuery,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  Divider,
  Toolbar,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { useDrawerContext } from "../../contexts";
import { useState } from "react";
import MenuIcon from "./MenuIcon";
import Logo from "../../../images/login/logo.svg";

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
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
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
      <ListItemText primary={label} />
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
  const [open, setOpen] = useState(true);
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { drawerOptions, toggleDrawerOpen } = useDrawerContext();

  const handleDrawerOpenOrClose = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: "#fff" }}>
        <Toolbar
          disableGutters
          sx={{
            paddingLeft: 2,
            paddingRight: 2,
            height: "75px",
            justifyContent: "space-between",
          }}
        >
          <Box
            alt="logo"
            src={Logo}
            component="img"
            sx={{ width: 60, height: "100%" }}
          ></Box>
          <MenuIcon />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={smDown ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawerOpen}
      >
        <DrawerHeader></DrawerHeader>
        <Divider />
        <Box flex={1} sx={{ mt: theme.spacing(1) }}>
          <List component="nav">
            {drawerOptions.map((drawerOption) => (
              <ListItemLink
                to={drawerOption.path}
                key={drawerOption.path}
                icon={drawerOption.icon}
                label={drawerOption.label}
                onClick={smDown ? toggleDrawerOpen : undefined}
              />
            ))}
          </List>
        </Box>
        <Box>
          <Divider></Divider>
          <Button
            onClick={handleDrawerOpenOrClose}
            sx={{
              padding: 2,
              color: "#000",
              width: "100%",
              background: "#FFFFFF",
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
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
