// import { useState } from "react";
//
// import RequestsCalendar from "./RequestsCalendar";
// import ResourceRequest from "./ResourcesView";
// import RoomRequest from "./RoomsView";
// import TitleTab from "./TitleTab";
// import NewRequest from "./NewRequest";
import inDev from "../../../assets/images/in-development.png";

//TODO: O AgentClone é para analisar e dar refactor às funções agent para serem reutilizadas
//TODO: ver mui.com para instalar as packages de time picker
//! Ver o ficheiro nos Downloads com o Layout desenhado dos popups Forms

//TODO: Requisições só podem ser feitas para o dia de Hoje e Futuro!
//TODO: Apenas dias >= Hoje podem ser criadas requisições
//TODO: Dias para < Hoje servem apenas como histórico
//TODO: Atualizar o css e o jsx do RequestsCalender para mostrar os dias todos

function RequestsTab() {
    return (
        <div className="tab" id="statsTab">
            <img src={inDev} alt="secção em desenvolvimento" />
            <h1>Secção em desenvolvimento</h1>
        </div>
    );

    // const [date, setDate] = useState(new Date());
    // const [activeTab, setActiveTab] = useState("rooms");
    //
    // return (
    // 	<div className="tab" id="requestsTab">
    // 		<RequestsCalendar dateState={{ date, setDate }} />
    // 		<div className="requests">
    // 			<TitleTab activeTab={activeTab} setActiveTab={setActiveTab} />
    // 			<NewRequest activeTab={activeTab}/>
    // 			{activeTab === "rooms" && <RoomRequest />}
    // 			{activeTab === "resources" && <ResourceRequest />}
    // 		</div>
    // 	</div>
    // );
}

export default RequestsTab;
