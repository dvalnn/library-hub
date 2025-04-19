function SubmitButton({ btnId, btnText, handleClick }) {
    return (
        <button
            type="button"
            className="submit"
            id={btnId}
            onClick={handleClick}
        >
            <svg viewBox="0 0 24 24" className="arr-2">
                <title>submeter</title>
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
            <span className="text">{btnText}</span>
            <span className="circle" />
            <svg viewBox="0 0 24 24" className="arr-1">
                <title>placeholder</title>
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
        </button>
    );
}

export default SubmitButton;
