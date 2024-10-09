import { useState } from "react";

// import { RadioSelector } from "./searchBar";

//? Tou a pensar fazer esta tab sendo apenas a janela divido em dois tipo main window.
//? A da esquerda é um calendário sempre em display com um date picker, e mais uns botões de filtros
//? A da direita fica igual à janela de Registos mas sem as coisas a meio
//? Talvez simplesmente chamar o recordList e mudar a função para receber o ID do parent e dar conditional render ao butão do lixo


function Calender({ }) {
    <div className="calender"></div>
}

function RegistWindow({ }) {
    <div className="historyRegists">

    </div>
}

function HistoryWindow({ }) {
    <div className="history">
        <RegistWindow />
        <Calender />
    </div>
}


export { HistoryWindow }