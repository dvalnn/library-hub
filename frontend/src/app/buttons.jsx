//TODO: rever títulos dos svgs
//TODO: Adicionar button type

function SubmitBtn({ btnId, btnText, handleClick }) {
	return (
		<button type="button" className="submit" id={btnId} onClick={handleClick}>
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

function SelectButton({ isSelected, handleClick }) {
	const plusButton = () => (
		<svg className="selectIcon" id="plus" viewBox="0 0 30 30">
			<title>Adicionar</title>
			<path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
		</svg>
	);

	const minusButton = () => (
		<svg className="selectIcon" id="minus" viewBox="0 0 30 30">
			<title>Remover</title>
			<path d="M6.25 16.25H23.75V13.75H6.25V16.25Z" />
		</svg>
	);

	const selectBtn = isSelected ? minusButton() : plusButton();
	const btnID = isSelected ? "minusBtn" : "plusBtn";

	return (
		<button
			type="button"
			className="registBtn"
			id={btnID}
			onClick={handleClick}
		>
			<style>{"transition: transform 0.3s ease;"}</style>
			{selectBtn}
		</button>
	);
}

function BinButton({ handleClick }) {
	return (
		<button type="button" id="bin-button" onClick={handleClick}>
			<svg className="bin-top" viewBox="0 0 39 7" fill="none">
				<title>apagar</title>
				<line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4" />
				<line
					x1="12"
					y1="1.5"
					x2="26.0357"
					y2="1.5"
					stroke="white"
					strokeWidth="3"
				/>
			</svg>
			<svg className="bin-bottom" viewBox="0 0 33 39" fill="none">
				<title>apagar</title>
				<mask fill="white">
					<path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
				</mask>
				<path
					d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
					fill="white"
					mask="url(#path-1-inside-1_8_19)"
				/>
				<path d="M12 6L12 29" stroke="white" strokeWidth="4" />
				<path d="M21 6V29" stroke="white" strokeWidth="4" />
			</svg>
		</button>
	);
}

export { SubmitBtn, SelectButton, BinButton };
