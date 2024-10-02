export default function Tabs({ activeTab, setActiveTab }) {

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tabs-navigation" >
            <button
                className={`tabBtn ${activeTab === "regists" ? "active" : ""}`}
                onClick={() => handleTabClick("regists")}
            >
                <span>Registos</span>
            </button>

            <button
                className={`tabBtn ${activeTab === "requests" ? "active" : ""}`}
                onClick={() => handleTabClick("requests")}
            >
                <span>Requisições</span>
            </button>

            <button
                className={`tabBtn ${activeTab === "stats" ? "active" : ""}`}
                onClick={() => handleTabClick("stats")}
            >
                <span>Estatística</span>
            </button>
        </div>
    );
}