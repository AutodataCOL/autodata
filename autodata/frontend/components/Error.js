const ErrorBlock = (props) => {
    return (
        <div id="error">
            <p>
                {props.message}
            </p>
        </div>
    )
}

export default ErrorBlock