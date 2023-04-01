import style from "../../../../styles/Product/ProductRegiser.module.scss";
import { oneInformation } from "../../../models/product";

interface props{
  qtd: string;
  data: oneInformation[];
  change: (text:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ProductRegister: React.FC<props> = ({change, data, qtd}) => {
  return (
    <div className={style.container}>
        <div className={style.tabela}>
          <div className={style.campos}>
            <p>Tamanho</p>
            <p>Cor</p>
            <p>Qtd</p>
          </div>
          <div className={style.lista}>
            {
              data.map((row, index) => (
                <div className={style.rows}>
                  <p>{row.size}</p>
                  <p>{row.color}</p>
                  <p>{row.quantity}</p>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}
