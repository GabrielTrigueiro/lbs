import { Outlet } from "react-router";
import { MenuLateral } from "../../shared/components";
import { useSideBarContext } from "../../shared/contexts";
import {useEffect} from "react";
import styles from "../../styles/Home/Home.module.scss";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function Home() {

    const { setSideBarOption } = useSideBarContext();

    const token = localStorage.getItem('Acess_Token')?.replace(/"/g,'');

    useEffect(() => {
        // console.log(token)
        setSideBarOption([
          {
            label: "Clientes",
            icon: "account_circle",
            path: "/home/clientes",
          },
          {
            label: "Fornecedores",
            icon: "badge",   
            path: "/home/fornecedores",
          },
          {
            label: "Indicações",
            icon: "diversity_3",   
            path: "/home/indicacoes",
          },
          {
            label: "categorias",
            icon: "local_offer",   
            path: "/home/categorias",
          },
          {
            label: "produtos",
            icon: "shopping_bag",   
            path: "/home/produtos",
          },
        ]);
      }, [token]);

    return(
        <div className={styles.container}>
            <MenuLateral>
                <Outlet/>
            </MenuLateral>
        </div>
    )
}