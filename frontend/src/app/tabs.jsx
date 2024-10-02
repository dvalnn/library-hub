export default function Tabs({ activeTab, setActiveTab }) {

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tab-container" >
            <input
                type="radio"
                id="regists"
                className="tabRadio"
                onClick={() => handleTabClick("regists")}
                checked = {activeTab==="regists"}
            />
            <label className="tabLabel" for="regists">Registos</label>

            <input
                type="radio"
                id="requests"
                className="tabRadio"
                onClick={() => handleTabClick("requests")}
                checked = {activeTab==="requests"}
            />
            <label className="tabLabel" for="requests">Requisições</label>

            <input
                type="radio"
                id="stats"
                className="tabRadio"
                onClick={() => handleTabClick("stats")}
                checked = {activeTab==="stats"}
            />
            <label className="tabLabel" for="stats">Estatística</label>
        </div>
    );
}