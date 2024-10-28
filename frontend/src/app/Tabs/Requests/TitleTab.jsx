function TitleTab({ activeTab, setActiveTab }) {
    const handleTabSwitch = () => {
        setActiveTab(activeTab === "rooms" ? "resources" : "rooms");
    };

    return (
        <div className="tabSwitch">
            {activeTab === "rooms" ? (
                <>
                    <h1 className="title">Salas</h1>
                    <button className="switch" onClick={handleTabSwitch}>
                        <svg id="chevRight" viewBox="0 0 320 512">
                            <title>Recursos</title>
                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                    </button>
                </>
            ) : (
                <>
                    <button className="switch" onClick={handleTabSwitch}>
                        <svg id="chevLeft" viewBox="0 0 320 512">
                            <title>Salas</title>
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                        </svg>
                    </button>
                    <h1 className="title">Recursos</h1>
                </>
            )}
        </div>
    );
}

export default TitleTab;
