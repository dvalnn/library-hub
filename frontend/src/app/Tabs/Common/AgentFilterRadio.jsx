function AgentFilterRadio({ selection, setSelection }) {
	const LabelSelect = ({ labelName, labelState, selection, setSelection }) => (
		<label className="radio">
			<input
				type="radio"
				checked={selection === labelState}
				onChange={() => setSelection(labelState)}
			/>
			<span className="name">{labelName}</span>
		</label>
	);

	return (
		<div id="user-selector">
			<LabelSelect
				labelName={"Aluno"}
				labelState={"student"}
				selection={selection}
				setSelection={setSelection}
			/>
			<LabelSelect
				labelName={"Professor"}
				labelState={"teacher"}
				selection={selection}
				setSelection={setSelection}
			/>
			<LabelSelect
				labelName={"Assistente"}
				labelState={"assistant"}
				selection={selection}
				setSelection={setSelection}
			/>
			<LabelSelect
				labelName={"Todos"}
				labelState={"everyone"}
				selection={selection}
				setSelection={setSelection}
			/>
		</div>
	);
}

export default AgentFilterRadio;
