/** @format */

import { useState } from "react";
import "./window.css";

function MainWindow() {
  return <div id="formsWindow"></div>;
}

function useTypeUser() { }

function AuxRow({ userType, stdClass }) {
  return (
    <div className="supportingRow">
      {userType === 1 && <h2>{stdClass}</h2>}
      <form className="atividade">
        <Option userType={userType} />
      </form>
    </div>
  );
}

function Option({ userType }) {
  switch (userType) {
    case 1:
      return (
        <select id="drop_act">
          <option value="" disabled selected>Selecione atividade</option>
          <option value="Computadores">Computadores</option>
          <option value="Trabalho individual">Trabalho individual</option>
          <option value="Espaço Lúdico">Espaço Lúdico</option>
          <option value="Trabalho de grupo">Trabalho de grupo</option>
          <option value="Realização de testes">Realização de testes</option>
          <option value="Expulso da Sala de Aula">Expulso da Sala de Aula</option>
        </select>
      )
    case 2:
      return (
        <select id="drop_act">
          <option value="" disabled selected>Selecione atividade</option>
          <option value="Computadores">Computadores</option>
          <option value="Trabalho individual">Trabalho individual</option>
          <option value="Espaço Lúdico">Espaço Lúdico</option>
          <option value="Trabalho de grupo">Trabalho de grupo</option>
        </select>
      )
    case 3:
      return (
        <select id="drop_act">
          <option value="" disabled selected>Selecione atividade</option>
          <option value="Computadores">Computadores</option>
          <option value="Espaço Lúdico">Espaço Lúdico</option>
        </select>
      )
    default:
      return (
        <select id="drop_act">
          <option value="" disabled selected>Selecione atividade</option>
        </select>
      )
  }
}
