import './defaultButton.css'

const DefaultButton = ({ children, color='black', onClick, type='button', disabled=false}) => {
    return (
        <button className="defaultButton" 
        onClick={onClick}
        style={{background: color}}
        type={type}
        disabled={disabled}
        >
            {children}
        </button>
    );
}

export default DefaultButton;