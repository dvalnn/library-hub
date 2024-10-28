import React, { useState } from 'react';
import { ResourceForms, RoomForms } from './RequestsForms';

function NewRequest({ activeTab }) {
    let title = activeTab === "rooms" ? "Requisitar Espaços" : "Requisitar Recursos";

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className="newRequest">
            <button
                type="button"
                className="newBtn"
                onClick={openPopup}
            >
                <svg className="selectIcon" id="plus" viewBox="0 0 30 30">
                    <title>Adicionar</title>
                    <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z" />
                </svg>
            </button>

            <h1 className="btnTitle">{title}</h1>
            {(isPopupOpen === true && activeTab === "rooms") && <RoomForms onClose={closePopup} />}
            {(isPopupOpen === true && activeTab === "resources") && <ResourceForms onClose={closePopup} />}
        </div>
    );
}

export default NewRequest;