export default function Tabs({ activeTab, setActiveTab }) {
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className="tab-container">
			<input
				type="radio"
				id="records"
				className="tabRadio"
				onClick={() => handleTabClick("records")}
				checked={activeTab === "records"}
			/>
			<label className="tabLabel" htmlFor="records" id="recordsLabel">
				Registos
			</label>

			<input
				type="radio"
				id="history"
				className="tabRadio"
				onClick={() => handleTabClick("history")}
				checked={activeTab === "history"}
			/>
			<label className="tabLabel" htmlFor="history" id="historyLabel">
				Histórico
			</label>

			<input
				type="radio"
				id="requests"
				className="tabRadio"
				onClick={() => handleTabClick("requests")}
				checked={activeTab === "requests"}
			/>
			<label className="tabLabel" htmlFor="requests" id="requestsLabel">
				Requisições
			</label>

			<input
				type="radio"
				id="stats"
				className="tabRadio"
				onClick={() => handleTabClick("stats")}
				checked={activeTab === "stats"}
			/>
			<label className="tabLabel" htmlFor="stats" id="statsLabel">
				Estatística
			</label>
		</div>
	);
}
