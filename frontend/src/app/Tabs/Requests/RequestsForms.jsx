import React, { useState } from 'react';

import SearchBar from '../Records/SearchBar';

//TODO: Search to be done. Fix AgentList parameters to perform search

function RoomForms({ onClose }) {
    const [name, setName] = useState("");
    const [search, setSearch] = useState(false); // Add search state
    let filter = "teacher";

    // Room-specific dropdown options
    const roomOptions = ["Auditório", "Sala de Computadores", "Galeria"];

    // Function to handle search when the input changes or on submit
    const handleSearchInputChange = (input) => {
        setName(input);
        setSearch(true); // Set search to true when input changes
    };

    return (
        <div id="formsPage">
            <div className="formsWindow">
                <button className="closeButton" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none">
                        <title>fechar</title>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729" />
                    </svg>
                </button>
                <div id="mainWindow">
                    <div className="resultWindow">
                        <h1 className="title">Resultados de Pesquisa</h1>
                        <SearchBar
                            inputCallback={handleSearchInputChange}
                            radioSelection={filter}
                            agentOptions={null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResourceForms({ onClose }) {
    const [name, setName] = useState("");
    const [filter, setFilter] = useState("teacher");
    const AgentOptions = [
        { labelName: "Aluno", labelState: "student" },
        { labelName: "Professor", labelState: "teacher" },
    ];

    return (
        <div id="formsPage">
            <div className="formsWindow">
                <button className="closeButton" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none">
                        <title>fechar</title>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729" />
                    </svg>
                </button>
                <div id="mainWindow">
                    <div className="resultWindow">
                        <h1 className="title">Resultados de Pesquisa</h1>
                        <SearchBar
                            inputCallback={setName}
                            radioSelection={filter}
                            setRadioSelection={setFilter}
                            agentOptions={AgentOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { RoomForms, ResourceForms };