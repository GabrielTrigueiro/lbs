import React from 'react'
import { oneInformation } from '../../models/product'
import styles from "../../../styles/Product/InfoRow.module.scss"

interface props{
    rows: oneInformation
    ind: string;
}

export const ProductInfoRow: React.FC<props> = ({rows, ind}) => {
    return (
        <div id={ind} className={styles.rows}>
            <p>{rows.size}</p>
            <p>{rows.color}</p>
            <p>{rows.quantity}</p>
        </div>
    )
}
