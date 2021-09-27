import styles from '../styles/input.module.css'

const Input = (props) => {
    return (
        <input className={styles._style}
            placeholder={props.text}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default Input