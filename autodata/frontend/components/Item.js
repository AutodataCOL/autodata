import styles from '../styles/item.module.css'
import Button from '../components/Button'

const Item = (props) => {
    return (
        <div className={styles.container}>
            <div>
                <p>Ref: {props.reference}</p>
                <p>Nombre: {props.name}</p>
                <p>Precio: {props.cost}</p>
                <p>Unidades: {props.units}</p>
            </div>
            <div>
                <Button btnRef={props.btnRef} handleClick={props.handleClick} text="Eliminar" />
            </div>
        </div>
    )
}

export default Item