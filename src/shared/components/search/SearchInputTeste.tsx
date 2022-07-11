import { IInfoClient } from "../../services"
import SearchIcon from '@mui/icons-material/Search';
import "./Style.css"

interface ISearchInputTesteProps {
    placeHolder: string
    dados: IInfoClient[]
}

export const SearchInputTeste: React.FC<ISearchInputTesteProps> = ({placeHolder, dados}) => {

    return(
        <div className="Search">

            <div className="SearchInput">
                <input type="text" placeholder={placeHolder}/>
                <div className="SearchIcon"><SearchIcon/></div>
            </div>

            <div className="DadosResult">
                {dados.map((value) => {
                    return(
                        <p className="DataItem">{value.name}</p>
                    )
                })}
            </div>

        </div>
    )
};
