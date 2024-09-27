import AgentDetails from "./agentDetails.jsx";

function Agent({ agent, selectionFuncs, btnType }) {
	const [appendFunc, removeFunc, checkFunc] = selectionFuncs;

	const isSelected = checkFunc(agent.ID);
	const clickFunc = isSelected ? removeFunc : appendFunc;
	const handleClick = () => {
		clickFunc(agent.ID)
	};

	const divID = isSelected ? "Selected" : "NotSelected";

	const plusButton = () => (
		<svg className="selectIcon" viewBox="0 0 30 30">
			<title>Selecionar</title>
			<path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
		</svg>
	)

	const minusButton = () => (
		<svg className="selectIcon" viewBox="0 0 30 30">
			<title>Desselecionar</title>
			<path d="M6.25 16.25H23.75V13.75H6.25V16.25Z" />
		</svg>
	)

	const selectBtn = isSelected ? minusButton : plusButton;

	// Renders the "plus" button (button type 1)
	const renderSelectButton = (svg) => (
		<button
			type="button"
			className="registBtn"
			id="selectIcon"
			onClick={handleClick}
		>
			{svg()}
		</button>
	);



	// Renders the "bin" button (button type other than 1)
	const renderBinButton = () => (
		<button type="button" id="bin-button">
			<svg
				className="bin-top"
				viewBox="0 0 39 7"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
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
			<svg
				className="bin-bottom"
				viewBox="0 0 33 39"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>apagar</title>
				<mask id="path-1-inside-1_8_19" fill="white">
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

	return (
		<div className="agentInfo" id={divID}>
			{/* Conditionally render the button based on btnType */}
			{btnType === 1 ? renderSelectButton(selectBtn) : renderBinButton()}

			{/* Display agent information */}
			<li className="newRegist">
				<h1 className="name">{agent.name}</h1>
				<AgentDetails agent={agent} />
			</li>
		</div>
	);
}

export default Agent;
