import {useEffect, useState } from "react";


function AlertEvents({eventId}) {

    //? apenas para formatar o css
    const eventId1 = "success";
    const eventId2 = "error";
    const eventId3 = "warning";

    return (
        <div id="alertBox">
            {/* <div className="alert" id={eventId}>
                <Event eventId={eventId} />
                <h3></h3>
            </div> */}
            <div className="alert" id={eventId1}>
                <Event eventId={eventId1} />
                <h3>Texto template aqui de sucesso</h3>
            </div>
            <div className="alert" id={eventId2}>
                <Event eventId={eventId2} />
                <h3>Texto template aqui de sucesso</h3>
            </div>
            <div className="alert" id={eventId3}>
                <Event eventId={eventId3} />
                <h3>Texto template aqui de sucesso</h3>
            </div>
        </div>
    );
}

function Event({ eventId }) {
    switch (eventId) {
        case "success": {
            return (
                <svg viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
            );
        }
        case "error": {
            return (
                <svg viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
            );
        }
        case "warning": {
            return (
                <svg viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
            );
        }
    }
}

export default AlertEvents;
