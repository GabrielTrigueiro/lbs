import { Outlet } from "react-router";
import MenuIcon from "../../shared/components/menu/MenuIcon";
import { MenuLateral } from "../../shared/components";
import { useSideBarContext } from "../../shared/contexts";
import {useEffect} from "react";

export default function Home() {

    const { setSideBarOption } = useSideBarContext();

    useEffect(() => {
        setSideBarOption([
          {
            label: "Clientes",
            icon: "person_outline_icon",
            path: "/home/clientes",
          },
          {
            label: "Fornecedores",
            icon: "account_box_icon",   
            path: "/home/provedores",
          },
        ]);
      }, []);

    return(
        <>
            <MenuLateral>
                <Outlet/>
            </MenuLateral>
        </>
    )
}