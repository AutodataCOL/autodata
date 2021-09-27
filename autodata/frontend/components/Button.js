import styles from '../styles/button.module.css'

const Button = (props) => {
    return (
        <button className={styles._style}
            disabled={props.setDisable}
            onClick={props.handleClick}
            id={props.btnRef}>
            {props.text}
        </button>
    )
}

export default Button