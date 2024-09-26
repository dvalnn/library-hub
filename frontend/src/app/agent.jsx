import { useState } from "react";

import AgentDetails from "./agentDetails.jsx";

function Agent({ agent, selectionFuncs, btnType }) {
	const [appendFunc, removeFunc, checkFunc] = selectionFuncs;

	const isSelected = checkFunc(agent.ID);
	const handleClick = () => {
		if (!isSelected) {
			appendFunc(agent.ID);
		} else {
			removeFunc(agent.ID);
		}
	};

	// Renders the "plus" button (button type 1)
	const renderPlusButton = () => (
		<button
			type="button"
			className="registBtn"
			id="plusButton"
			onClick={handleClick}
		>
			<svg
				className="plusIcon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 30 30"
			>
				<title>selecionar</title>
				<g mask="url(#mask0_21_345)">
					<path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
				</g>
			</svg>
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
		<div className="icon-and-info">
			{/* Conditionally render the button based on btnType */}
			{btnType === 1 ? renderPlusButton() : renderBinButton()}

			{/* Display agent information */}
			<li className="newRegist">
				<h1 className="name">{agent.name}</h1>
				<AgentDetails agent={agent} />
			</li>
		</div>
	);
}
export default Agent;
