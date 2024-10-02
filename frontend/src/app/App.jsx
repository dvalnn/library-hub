import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";
import "./css/dropdown.css";
import "./css/alerts.css";
import "./css/loader.css";

import { act, useState } from "react";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";
import Tabs from "./tabs.jsx";

//* Main HTML Body
function App() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");

	const searchReset = () => {
		setName("");
		setFilter("everyone");
	};

	const [activeTab, setActiveTab] = useState("regists");


	return (
		<div id="App">
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />


			{activeTab === "regists" && (
				<div className="tab" id="registTab">
					<SearchBar
						inputCallback={setName}
						radioSelection={filter}
						setRadioSelection={setFilter}
					/>
					<MainWindow name={name} filter={filter} windowReset={searchReset} />
				</div>
			)}

			{activeTab === "requests" && (
				<div className="tab" id="requestTab">
					<h1>Isto é a página das Requisições</h1>
				</div>
			)}

			{activeTab === "stats" && (
				<div className="tab" id="statsTab">
					<h1>Isto é a página da Estatística</h1>
				</div>
			)}
		</div>
	);
}

export default App;
