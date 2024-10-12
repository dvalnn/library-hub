function Tabs({ activeTab, setActiveTab }) {
	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<div className="tab-container">
			<input
				type="radio"
				id="records"
				className="tabRadio"
				checked={activeTab === "records"}
				onChange={() => handleTabChange("records")}
			/>
			<label className="tabLabel" htmlFor="records" id="recordsLabel">
				Registos
			</label>

			<input
				type="radio"
				id="history"
				className="tabRadio"
				checked={activeTab === "history"}
				onChange={() => handleTabChange("history")}
			/>
			<label className="tabLabel" htmlFor="history" id="historyLabel">
				Histórico
			</label>

			<input
				type="radio"
				id="requests"
				className="tabRadio"
				checked={activeTab === "requests"}
				onChange={() => handleTabChange("requests")}
			/>
			<label className="tabLabel" htmlFor="requests" id="requestsLabel">
				Requisições
			</label>

			<input
				type="radio"
				id="stats"
				className="tabRadio"
				checked={activeTab === "stats"}
				onChange={() => handleTabChange("stats")}
			/>
			<label className="tabLabel" htmlFor="stats" id="statsLabel">
				Estatística
			</label>
		</div>
	);
}

export default Tabs;
