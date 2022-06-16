import { Button, Typography } from "@mui/material"
import { isContext } from "vm";

interface IMenuLateralIcon {
    iconText: string;

}

export const MenuLateralIcon: React.FC<IMenuLateralIcon> = ({children}) => {
    return(
        <Button>
            {children}
            <Typography>{isContext}</Typography>
        </Button>
    )
}