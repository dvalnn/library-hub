import "./css/mainWindow.css";
import "./css/searchBar.css";
import "./css/buttons.css";
import "./css/dropdown.css";
import "./css/alerts.css";
import "./css/loader.css";
import "./css/tabs.css";
import "./css/calendar.css";
import "./css/history.css";

import { useState } from "react";

import HistoryTab from "./Tabs/History/HistoryTab.jsx";
import RecordsTab from "./Tabs/Records/RecordsTab.jsx";
import RequestsTab from "./Tabs/Requests/RequestsTab.jsx";
import StatisticsTab from "./Tabs/Statistics/StatisticsTab.jsx";
import TabsRadioSelector from "./Tabs/TabsRadioSelector.jsx";

import Notifications from "./Tabs/Common/Notifications.jsx";
import useNotications from "./Tabs/Common/useNotifications.js";
import useRecordsState from "./Tabs/Common/useRecordsState.js";

//*MIGUEL:
//TODO: Ajeitar o CSS das notificações para elas aparecerem a partir da App em vez de só existirem na TAB de records
//TODO: Loader
//TODO: Fades de Scroll
//TODO: Verificar cores usadas e remover cores n utilizadas

//*TIAGO:
//TODO: Loader

//* Main HTML Body
function App() {
	const [activeTab, setActiveTab] = useState("records");

	const [text, setSuccess, setWarning, setError] = useNotications();
	const notificationSetters = [setSuccess, setWarning, setError];
	const [
		records,
		createRecords,
		markRecord,
		removeMark,
		checkMark,
		deleteMarked,
	] = useRecordsState(notificationSetters);

	return (
		<div id="App">
			<TabsRadioSelector activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === "records" && (
				<RecordsTab
					recordsState={[
						records,
						createRecords,
						markRecord,
						removeMark,
						checkMark,
						deleteMarked,
					]}
					notifSetters={notificationSetters}
				/>
			)}
			{activeTab === "history" && <HistoryTab />}
			{activeTab === "requests" && <RequestsTab />}
			{activeTab === "stats" && <StatisticsTab />}
			{/*<Notifications text={text} setters={notificationSetters} />*/}
		</div>
	);
}

export default App;
