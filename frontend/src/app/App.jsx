import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";
import "./css/dropdown.css";
import "./css/alerts.css";
import "./css/loader.css";
import "./css/tabs.css";
import "./css/calendar.css";
import "./css/history.css" 

import { useState } from "react";

import HistoryTab from "./Tabs/History/HistoryTab.jsx";
import RecordsTab from "./Tabs/Records/RecordsTab.jsx";
import RequestsTab from "./Tabs/Requests/RequestsTab.jsx";
import StatisticsTab from "./Tabs/Statistics/StatisticsTab.jsx";
import TabsRadioSelector from "./Tabs/TabsRadioSelector.jsx";

//*MIGUEL:
//TODO: Loader
//TODO: Fades de Scroll
//TODO: Verificar cores usadas e remover cores n utilizadas

//*TIAGO:
//TODO: Identificar se a hora pertence ao turno da manhã ou de tarde
//TODO: Identificar qual o dia da semana dependendo da data
//TODO: Substitui o atual hora e data nos resgistos adicionados (o que tá escrito) por turno (manhã tarde) e dia da semana
//TODO: Loader

//* Main HTML Body
function App() {
	const [activeTab, setActiveTab] = useState("records");
	return (
		<div id="App">
			<TabsRadioSelector activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === "records" && <RecordsTab />}
			{activeTab === "history" && <HistoryTab />}
			{activeTab === "requests" && <RequestsTab />}
			{activeTab === "stats" && <StatisticsTab />}
		</div>
	);
}

export default App;
