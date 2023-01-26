import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
  }
  
export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}