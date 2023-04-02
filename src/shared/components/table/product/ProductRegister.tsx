import style from "../../../../styles/Product/ProductRegiser.module.scss";
import { oneInformation } from "../../../models/product";
import { ProductInfoRow } from "../../modal/ProductInfoRow";

interface props {
  data: oneInformation[];
  change: (text: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ProductRegister: React.FC<props> = ({ change, data }) => {
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
              <ProductInfoRow ind={String(index)} rows={row} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
