import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";
import "./css/dropdown.css";
import "./css/alerts.css";
import "./css/loader.css";

import { useState } from "react";

import SearchBar from "./searchBar.jsx";
import MainWindow from "./mainWindow.jsx";


//*MIGUEL:
//TODO: Implementar TABs
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

	return (
		<div id="App">
			<SearchBar
				inputCallback={setName}
				radioSelection={filter}
				setRadioSelection={setFilter}
			/>
			<MainWindow name={name} filter={filter}/>
		</div>
	);
}

export default App;
