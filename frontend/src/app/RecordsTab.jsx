import { useState } from "react";

import { SearchBar } from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";

function RecordsTab() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");

	return (
		<div className="tab" id="recordsTab">
			<SearchBar
				inputCallback={setName}
				radioSelection={filter}
				setRadioSelection={setFilter}
			/>
			<MainWindow name={name} filter={filter} />
		</div>
	);
}

export default RecordsTab;
