import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";
import "./css/dropdown.css";
import "./css/alerts.css";
import "./css/loader.css";
import "./css/tabs.css";
import "./css/history.css"

import inDev from "../assets/images/in-development.png";

import { useState } from "react";

import { SearchBar } from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";
import Tabs from "./tabs.jsx";
import { History, DatePicker } from "./history.jsx";

//*MIGUEL:
//TODO: Fazer um calendário para selecionar os dias na tab do histórico
//TODO: Loader
//TODO: Fades de Scroll
//TODO: Verificar cores usadas e remover cores n utilizadas

//*TIAGO:
//TODO: Histórico de registos
//TODO: Loader
//TODO: Identificar se a hora pertence ao turno da manhã ou de tarde
//TODO: Identificar qual o dia da semana dependendo da data
//TODO: Substitui o atual hora e data nos resgistos adicionados (o que tá escrito) por turno (manhã tarde) e dia da semana

//* Main HTML Body
function App() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");
	const [activeTab, setActiveTab] = useState("records");

	return (
		<div id="App">
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

			{activeTab === "records" && (
				<div className="tab" id="recordsTab">
					<SearchBar
						inputCallback={setName}
						radioSelection={filter}
						setRadioSelection={setFilter}
					/>
					<MainWindow name={name} filter={filter} />
				</div>
			)}

			{activeTab === "history" && (
				<div className="tab" id="historyTab">
					<DatePicker
						radioSelection={filter}
						setRadioSelection={setFilter}
					/>
					<History />
				</div>
			)}

			{activeTab === "requests" && (
				<div className="tab" id="requestsTab">
					<img src={inDev} alt="secção em desenvolvimento" />
					<h1>Secção em desenvolvimento</h1>
				</div>
			)}

			{activeTab === "stats" && (
				<div className="tab" id="statsTab">
					<img src={inDev} alt="secção em desenvolvimento" />
					<h1>Secção em desenvolvimento</h1>
				</div>
			)}
		</div>
	);
}

export default App;
