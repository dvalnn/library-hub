function AgentFilterRadio({ selection, setSelection, options }) {
	const LabelSelect = ({ labelName, labelState }) => (
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
			{options.map((option) => (
				<LabelSelect
					key={option.labelState}
					labelName={option.labelName}
					labelState={option.labelState}
				/>
			))}
		</div>
	);
}

export default AgentFilterRadio;
