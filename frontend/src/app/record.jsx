import { BinButton } from "./buttons.jsx";

import { ActivityEnum } from "./js/ActivityEnum.js";

function Record({ record, deleteHandler }) {
	const date = new Date(record.CreatedAt);
	return (
		<div className="record" id="record">
			<BinButton
				handleClick={() => {
					deleteHandler(record.ID);
				}}
			/>
			<li className="details">
				<h1 className="name">{record.agent.name}</h1>
				<h1 className="activity">{ActivityEnum.getLabel(record.activity)}</h1>
				<h1 className="time">{date.toLocaleString()}</h1>
			</li>
		</div>
	);
}

export default Record;
