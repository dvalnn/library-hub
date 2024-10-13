import { useState } from "react";

import SearchBar from "./SearchBar.jsx";
import MainWindow from "./MainWindow.jsx";


function RecordsTab({ recordsState, notifSetters}) {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");

	return (
		<div className="tab" id="recordsTab">
			<SearchBar
				inputCallback={setName}
				radioSelection={filter}
				setRadioSelection={setFilter}
			/>
			<MainWindow
				name={name}
				filter={filter}
				recordsState={recordsState}
				notifSetters={notifSetters}
			/>
		</div>
	);
}

export default RecordsTab;
