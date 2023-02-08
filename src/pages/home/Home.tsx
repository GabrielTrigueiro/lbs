import { Outlet } from "react-router";
import { MenuLateral } from "../../shared/components";
import { useSideBarContext } from "../../shared/contexts";
import {useEffect} from "react";
import styles from "../../styles/Home/Home.module.scss";

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
          {
            label: "Indicações",
            icon: "local_offer_icon",   
            path: "/home/indicacoes",
          },
        ]);
      }, []);

    return(
        <div className={styles.container}>
            <MenuLateral>
                <Outlet/>
            </MenuLateral>
        </div>
    )
}