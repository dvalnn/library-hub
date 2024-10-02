import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";
import "./css/dropdown.css";
import "./css/alerts.css";
import "./css/loader.css";
import "./css/tabs.css";

import { useState } from "react";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";
import Tabs from "./tabs.jsx";


//*MIGUEL:
//TODO: Implementar TABs
	//! fazer um css de jeito para as TABs. Arranjar a altura da mainWindow
//TODO: Fazer um calendário para selecionar os dias
//TODO: Loader
//TODO: Fades de Scroll
//TODO: Verificar cores usadas e remover cores n utilizadas

//*TIAGO:
//TODO: Implementar pesquisa por turmas
//TODO: Loader
//TODO: Identificar se a hora pertence ao turno da manhã ou de tarde
//TODO: Identificar qual o dia da semana dependendo da data

//* Main HTML Body
function App() {
	const [name, setName] = useState("");
	const [filter, setFilter] = useState("everyone");
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
					<MainWindow name={name} filter={filter}/>
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
