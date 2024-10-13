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

export default SelectButton;
