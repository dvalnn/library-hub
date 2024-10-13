import inDev from "../../../assets/images/in-development.png";

function StatisticsTab() {
	return (
		<div className="tab" id="statsTab">
			<img src={inDev} alt="secção em desenvolvimento" />
			<h1>Secção em desenvolvimento</h1>
		</div>
	);
}

export default StatisticsTab;
